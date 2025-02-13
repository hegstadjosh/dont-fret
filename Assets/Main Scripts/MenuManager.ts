import { Interactable } from "SpectaclesInteractionKit/Components/Interaction/Interactable/Interactable";
import { validate } from "../SpectaclesInteractionKit/Utils/validate";

/**
 * Menu Manager for handling menu transitions and button interactions
 */
@component
export class MenuManager extends BaseScriptComponent {
    // Main menu buttons that will toggle other menus
    @input mainMenuButton1!: Interactable;
    @input mainMenuButton2!: Interactable;
    @input mainMenuButton3!: Interactable;
    //@input mainMenuButton4!: Interactable;
    // Menu objects to toggle
    @input menu1!: SceneObject;
    @input menu2!: SceneObject;
    @input menu3!: SceneObject;
    //@input menu4!: SceneObject;

    onAwake(): void {
        // Validate all required inputs
        validate(this.mainMenuButton1);
        validate(this.mainMenuButton2);
        validate(this.mainMenuButton3);
        validate(this.menu1);
        validate(this.menu2);
        validate(this.menu3);

        // Initially hide secondary menus
        this.menu1.enabled = false;
        this.menu2.enabled = false;
        this.menu3.enabled = false;

        // Bind button click events
        this.mainMenuButton1.onTriggerEnd.add(() => this.toggleMenu1());
        this.mainMenuButton2.onTriggerEnd.add(() => this.toggleMenu2());
        this.mainMenuButton3.onTriggerEnd.add(() => this.toggleMenu3());
    }

    private toggleMenu1(): void {
        this.menu1.enabled = !this.menu1.enabled;
        // Ensure other menu is closed when this one opens
        if (this.menu1.enabled) {
            this.menu2.enabled = false;
        }
    }

    private toggleMenu2(): void {
        this.menu2.enabled = !this.menu2.enabled;
        // Ensure other menu is closed when this one opens
        if (this.menu2.enabled) {
            this.menu1.enabled = false;
        }
    }

    private toggleMenu3(): void {
        this.menu3.enabled = !this.menu3.enabled;
    }
} 