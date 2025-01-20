import { Interactable } from "SpectaclesInteractionKit/Components/Interaction/Interactable/Interactable";
import { ScrollView } from "SpectaclesInteractionKit/Components/UI/ScrollView/ScrollView";
import { ScrollBar } from "SpectaclesInteractionKit/Components/UI/ScrollBar/ScrollBar";
import { validate } from "../SpectaclesInteractionKit/Utils/validate";

/**
 * Manages sheet music scrolling playback and song selection
 */
@component
export class SongMenu extends BaseScriptComponent {
    // Song selection buttons
    @input songButton1!: Interactable;
    @input songButton2!: Interactable;
    @input songButton3!: Interactable;
    @input songButton4!: Interactable;

    // Playback controls
    @input playPauseButton!: Interactable;
    @input sheetMusicScrollView!: ScrollView; // ScrollView containing the sheet music
    @input scrollBar!: ScrollBar; // ScrollBar for manual seeking
    @input sheetMusic!: SceneObject; // Screen Image containing the sheet music image

    // Audio component for playback
    @input audioComponent!: AudioComponent;

    // Playback state
    private isPlaying: boolean = false;
    private currentSongIndex: number = -1;
    private updateEvent: UpdateEvent;
    
    // Scroll speed should be adjusted based on the song's tempo
    // This represents how many units to scroll per second
    @input private scrollSpeed: number = 0.5;

    onAwake(): void {
        // Validate required inputs
        validate(this.songButton1);
        validate(this.songButton2);
        validate(this.songButton3);
        validate(this.songButton4);
        validate(this.playPauseButton);
        validate(this.sheetMusicScrollView);
        validate(this.scrollBar);
        validate(this.sheetMusic);
        validate(this.audioComponent);

        // Configure sheet music ScrollView
        this.sheetMusicScrollView.enableHorizontalScroll = true;
        this.sheetMusicScrollView.enableVerticalScroll = false;
        this.sheetMusicScrollView.enableScrollInertia = false; // Disable inertia for precise control
        this.sheetMusicScrollView.scrollLimit = 0.0; // No bounce effect needed

        // Bind button click events
        this.songButton1.onTriggerEnd.add(() => this.onSongSelected(1));
        this.songButton2.onTriggerEnd.add(() => this.onSongSelected(2));
        this.songButton3.onTriggerEnd.add(() => this.onSongSelected(3));
        this.songButton4.onTriggerEnd.add(() => this.onSongSelected(4));

        // Bind playback controls
        this.playPauseButton.onTriggerEnd.add(() => this.togglePlayback());

        // Set up update event for auto-scrolling during playback
        this.updateEvent = this.createEvent("UpdateEvent");
        this.updateEvent.bind(() => this.onUpdate());

        // Listen for manual scrolling events
        this.sheetMusicScrollView.onScrollUpdate.add((event) => {
            if (!this.isPlaying) {
                // Update audio position based on scroll position
                const scrollPercent = this.sheetMusicScrollView.scrollPercentage;
                const audioLength = this.audioComponent.duration;
                if (audioLength > 0) {
                    this.audioComponent.position = scrollPercent * audioLength;
                }
            }
        });
    }

    private onSongSelected(songIndex: number): void {
        if (this.currentSongIndex === songIndex) {
            return; // Already selected
        }

        this.currentSongIndex = songIndex;
        this.isPlaying = false;
        
        // Reset sheet music to beginning
        this.sheetMusicScrollView.snapToEdges({x: -1, y: 0, type: "Content"});

        // TODO: Load the appropriate song audio file and sheet music image
        print("Song " + songIndex + " selected");
    }

    private togglePlayback(): void {
        if (this.currentSongIndex === -1) {
            return; // No song selected
        }

        this.isPlaying = !this.isPlaying;
        
        if (this.isPlaying) {
            this.audioComponent.play(1);
            // TODO: Update play/pause button visual to show pause icon
        } else {
            this.audioComponent.pause();
            // TODO: Update play/pause button visual to show play icon
        }
    }

    private onUpdate(): void {
        if (!this.isPlaying) {
            return;
        }

        // Scroll the sheet music horizontally
        const scrollVector = new vec2(-this.scrollSpeed * getDeltaTime(), 0);
        this.sheetMusicScrollView.scrollBy(scrollVector);

        // Check if we've reached the end of the sheet music
        if (this.sheetMusicScrollView.checkContentEdgeFullyVisible(1, 0)) {
            // Reset to start and stop playback
            this.sheetMusicScrollView.snapToEdges({x: -1, y: 0, type: "Content"});
            this.togglePlayback(); // Stop playback when reaching the end
        }
    }
} 