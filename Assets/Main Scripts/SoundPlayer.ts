import { validate } from "../SpectaclesInteractionKit/Utils/validate";

/**
 * SoundPlayer component for managing and playing musical notes
 */
@component
export class SoundPlayer extends BaseScriptComponent {
    // Audio tracks for each note in the C major scale
    @input notes!: AudioTrackAsset[];

    // Dictionary to map note names to indices
    private noteToIndex: { [key: string]: number } = {
        'C': 0,
        'D': 1,
        'E': 2,
        'F': 3,
        'G': 4,
        'A': 5,
        'B': 6
    };

    private audioComponents: AudioComponent[] = [];

    onAwake(): void {
        // Validate notes input
        validate(this.notes);
        
        if (this.notes.length !== 7) {
            throw new Error("Expected 7 audio tracks for C major scale");
        }

        // Create audio components for each note
        for (let i = 0; i < this.notes.length; i++) {
            const audioComponent = this.getSceneObject().createComponent("Component.AudioComponent") as AudioComponent;
            audioComponent.audioTrack = this.notes[i];
            this.audioComponents[i] = audioComponent;
        }
    }

    

    /**
     * Play a note by its name (C, D, E, F, G, A, B)
     * @param noteName The name of the note to play
     */
    playNote(noteName: string): void {
        const index = this.noteToIndex[noteName.toUpperCase()];
        if (index !== undefined) {
            this.playNoteByIndex(index);
        } else {
            print("Invalid note name: " + noteName);
        }
    }

    /**
     * Play a note by its index (0-6)
     * @param index The index of the note to play (0=C, 1=D, etc.)
     */
    playNoteByIndex(index: number): void {
        if (index >= 0 && index < this.audioComponents.length) {
            try {
                this.audioComponents[index].play(1);
            } catch (e) {
                print("Error playing note: " + e);
            }
        } else {
            print("Invalid note index: " + index);
        }
    }

    /**
     * Play a random note from the scale
     */
    playRandomNote(): void {
        const randomIndex = Math.floor(Math.random() * this.audioComponents.length);
        this.playNoteByIndex(randomIndex);
    }
} 