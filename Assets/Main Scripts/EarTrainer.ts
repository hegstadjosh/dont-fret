import { Interactable } from "../SpectaclesInteractionKit/Components/Interaction/Interactable/Interactable";
import { validate } from "../SpectaclesInteractionKit/Utils/validate";
import { SoundPlayer } from "./SoundPlayer";

/**
 * EarTrainer component for handling note button interactions
 */
@component
export class EarTrainer extends BaseScriptComponent {
    // Buttons for each note in the C major scale
    @input cButton!: Interactable;
    @input dButton!: Interactable;
    @input eButton!: Interactable;
    @input fButton!: Interactable;
    @input gButton!: Interactable;
    @input aButton!: Interactable;
    @input bButton!: Interactable;
    @input randomButton!: Interactable;
    @input baseButton!: Interactable;

    @input soundPlayer!: SoundPlayer;

    onAwake(): void {
        // Validate all button inputs
        validate(this.cButton);
        validate(this.dButton);
        validate(this.eButton);
        validate(this.fButton);
        validate(this.gButton);
        validate(this.aButton);
        validate(this.bButton);
        validate(this.randomButton);
        validate(this.baseButton);

        // Validate sound player
        validate(this.soundPlayer);

        // Bind button click events
        this.setupButtonCallbacks();
    }

    private setupButtonCallbacks(): void {
        // Using onTriggerEnd for each button to play its corresponding note
        this.cButton.onTriggerEnd.add(() => this.soundPlayer?.playNote("C"));
        this.dButton.onTriggerEnd.add(() => this.soundPlayer?.playNote("D"));
        this.eButton.onTriggerEnd.add(() => this.soundPlayer?.playNote("E"));
        this.fButton.onTriggerEnd.add(() => this.soundPlayer?.playNote("F"));
        this.gButton.onTriggerEnd.add(() => this.soundPlayer?.playNote("G"));
        this.aButton.onTriggerEnd.add(() => this.soundPlayer?.playNote("A"));
        this.bButton.onTriggerEnd.add(() => this.soundPlayer?.playNote("B"));

        this.randomButton.onTriggerEnd.add(() => this.soundPlayer?.playRandomNote());
        this.baseButton.onTriggerEnd.add(() => this.soundPlayer?.playNote("C"));
    }
} 