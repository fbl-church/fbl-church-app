import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ik-tag-input-field',
  templateUrl: './tag-input-field.component.html',
})
export class TagInputFieldComponent implements OnInit {
  @HostBinding('class.flex-wrap') hostClass = true;
  @ViewChild('multiselectInput') multiselectInput: ElementRef;
  @Input() uniqueId: string;
  @Input() tags: string[] = [];
  @Input() placeholder = '';
  @Input() classOverride = 'input-tag__field';
  @Output() tagsUpdated = new EventEmitter<string[]>();

  readonly allowedTagsPattern: RegExp = /.+/;
  selectedInputTag: number = -1;

  tagForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  private get searchInputField(): AbstractControl {
    return this.tagForm.get('searchInput');
  }

  private get searchInputValue(): string {
    return this.searchInputField.value;
  }

  ngOnInit() {
    this.buildTagForm();
  }

  /**
   * Build the base form for the tags
   */
  buildTagForm() {
    this.tagForm = this.fb.group({ searchInput: '' });
  }

  /**
   * Will return the selected tags
   *
   * @returns List of string values
   */
  getTags() {
    return this.tags;
  }

  /**
   * Force focus on the input element when any part of the
   * multiselect element is clicked.
   *
   * @param event the click event
   * @param target the target element
   */
  @HostListener('click', ['$event'])
  onHostClick(event: MouseEvent) {
    this.multiselectInput.nativeElement.focus();
  }

  /**
   * Handle text pasted into the input field. Will add a set of tags from the pasted value. The
   * value is split based on the pasteSplitPattern property. The default is ','.
   * @param event the paste event
   */
  onInputPaste(event: ClipboardEvent) {
    let pastedString = '';
    if (event.clipboardData && event.clipboardData.getData) {
      pastedString = event.clipboardData.getData('text/plain');
    } else if (window['clipboardData'] && window['clipboardData'].getData) {
      pastedString = window['clipboardData'].getData('Text'); // Handle IE11
    } else {
      // Browser does not support pasting
    }

    this.addTags([pastedString]);
    setTimeout(() => this.resetSearchInput());
  }

  /**
   * Handle keypresses.
   *
   * @param event the keyboard event
   */
  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Backspace':
        this.handleBackspace();
        break;
      case 'Enter':
        this.addTags([this.searchInputValue]);
        event.preventDefault();
        break;
      default:
        break;
    }
  }

  /**
   * Add an search tag when input is blurred.
   */
  onInputBlurred() {
    this.addTags([this.searchInputValue]);
  }

  /**
   * Remove tag from the search list by the index.
   *
   * @param tagIndex The index of the tag to remove.
   */
  removeTagByIndex(tagIndex: any) {
    const clone = this.tags.slice(0);
    clone.splice(tagIndex, 1);
    this.tags = clone;
    this.resetSelected();
    this.tagsUpdated.emit(this.tags);
  }

  /**
   * Adds a list of tags to the input.
   *
   * @param tags - the list of tags to add
   */
  private addTags(tags: string[]): void {
    const validTags = tags
      .map((tag) => tag.trim())
      .filter((tag) => this.isTagValid(tag))
      .filter((tag, index, tagArray) => tagArray.indexOf(tag) === index);

    const newTags = this.tags.concat(validTags);
    if (!newTags.every((val) => this.tags.includes(val))) {
      this.tagsUpdated.emit(newTags);
    }
    this.tags = newTags;
    this.resetSearchInput();
    this.resetSelected();
  }

  /**
   * Checks to see if the tag being added is valid.
   *
   * @param tagString The tag to verify
   * @returns True if the tag is valid, otherwise false
   */
  private isTagValid(tagString: string): boolean {
    return this.allowedTagsPattern.test(tagString) && this.isTagUnique(tagString);
  }

  /**
   * Checks to see if the tag is not already in the list of tags
   *
   * @param tagString The tag to validate
   * @returns True if the tag is unqiue, otherwise false
   */
  private isTagUnique(tagString: string): boolean {
    const uppercaseTags = this.tags.map((t) => t.toUpperCase());
    return uppercaseTags.indexOf(tagString.toUpperCase()) === -1;
  }

  /**
   * Handles when the user clicks the backspace key
   */
  private handleBackspace(): void {
    if (!this.searchInputValue.length && this.tags.length) {
      if (this.selectedInputTag >= 0) {
        this.removeTagByIndex(this.tags.length - 1);
      } else {
        this.selectedInputTag = this.tags.length - 1;
      }
    }
  }

  /**
   * Reset the search input to an empty string
   */
  private resetSearchInput() {
    this.searchInputField.setValue('');
  }

  /**
   * Reset the selected tag
   */
  private resetSelected() {
    this.selectedInputTag = -1;
  }
}
