import { WebComponent } from '../../../js/Components/Base/WebComponent.js';

/**
 * @file BasicSelect.js
 * @description SelectElement is a custom web component that represents a dropdown menu (select element).
 * It allows users to select a single option from a list and supports customization for options, placeholder text, and disabled state.
 * 
 * @class SelectElement
 * @extends HTMLElement
 * 
 * @classdesc A custom HTML element that provides a dropdown (select) interface with customizable placeholder text and options. This component features a user-friendly UI, a dropdown button to toggle visibility, and visually distinct icons to indicate open and closed states.
 * The dropdown component uses Shadow DOM for encapsulating styles and ensuring isolation from external styles.
 * 
 * @example
 * <select-element placeholder="Sort by:" disabled>
 *   <option value="recent">Most recent</option>
 *   <option value="popular">Top sales / popular</option>
 *   <option value="price_low">Price: low to high</option>
 * </select-element>
 * 
 * @example
 * <select-element placeholder="Sort by:" options="Most recent|recent,Top sales / popular|popular,Price: low to high|price_low"></select-element>
 * 
 * @attribute {string} placeholder - The placeholder text displayed on the dropdown button when no option is selected.
 * @attribute {boolean} disabled - Disables the dropdown, making it non-interactive.
 * @attribute {string} options - A comma-separated list of options to be added programmatically as dropdown items.
 * @attribute {boolean} multiple - Enables multi-select mode for selecting multiple options.
 * @attribute {boolean} full-width - Makes the dropdown take up full width.
 * @attribute {boolean} all-option - Adds an "All" option that toggles all options on or off.
 * @attribute {boolean} legacy - Styles the dropdown to mimic the legacy style with gray borders.
 * @attribute {boolean} featureLocked- Indicates a certain feature is locked on specific plans
 * 
 * @method toggleOptions - Toggles the visibility of the dropdown options.
 * @method selectOption - Handles the selection of a dropdown option and updates the dropdown button.
 * @method setSelectedOption - Marks an option as selected and updates the dropdown button accordingly.
 * @method getValue - Returns the value of the currently selected option.
 * @method getSelectedValues - Returns an array of values of the selected options (multi-select mode).
 * 
 * @event change - Dispatched when the selected option(s) change.
 */
class SelectElement extends WebComponent {
  constructor() {
    super();
    this.loadBaseCSS();
    this.loadJQuery();
    this.loadBaseJS();
    this.loadIcons();

    let optionsArray = [];
    let currentlySelected = false;
    let count = 0;

    const navigator = this.hasAttribute('navigator');
    const multiple = this.hasAttribute('multiple');
    const allOption = this.hasAttribute('all-option');

    const options = this.querySelectorAll('option');

    if (multiple && allOption) {
      optionsArray.push({ value: '__all__', text: 'All' });
    }

    options.forEach((option) => {
      const isLocked = option.hasAttribute('featureLocked');
      optionsArray.push({ value: option.value, text: option.textContent, featureLocked: isLocked });
      if (option.getAttribute('selected') || option.selected) {
        currentlySelected = count;
      }
      count++;
    });

    const optionsAttr = this.getAttribute('options');
    if (optionsAttr) {
      const parsed = optionsAttr.split(',').map(str => {
        const [text, val] = str.split('|');
        return { text: text.trim(), value: (val || text).trim() };
      });
      optionsArray = optionsArray.concat(parsed);
    }

    this.setState({
      options: optionsArray,
      currentlySelected: currentlySelected,
      placeholder: this.getAttribute('placeholder') || 'Select: ',
      navigator,
      multiple,
      allOption,
      fontSize: this.getAttribute('font-size') || this.getAttribute('fontsize') || '16px',
      fontColor: this.getAttribute('font-color') || this.getAttribute('color') || '#222'

    });
  }

  setEventListeners() {
    const btn = this.shadowRoot.querySelector('.dropdown-btn');
    const container = this.shadowRoot.querySelector('.dropdown-option-container');
    const iconClosed = this.shadowRoot.querySelector('.option-closed-icon');
    const iconOpen = this.shadowRoot.querySelector('.option-open-icon');

    if (!btn || !container) return;

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = container.classList.contains('hide');
        container.classList.toggle('hide', !isHidden);
        iconClosed.classList.toggle('hide', isHidden);
        iconOpen.classList.toggle('hide', !isHidden);
    });

    container.addEventListener('click', (e) => this.selectOption(e));

    document.addEventListener('click', (e) => {
        if (!this.contains(e.target) && !this.shadowRoot.contains(e.target)) {
            container.classList.add('hide');
            iconClosed.classList.remove('hide');
            iconOpen.classList.add('hide');
        }
    });
  }

  toggleOptions(e) {
    const element = $(e.target).closest('.dropdown-container');
    const isHidden = element.find('.dropdown-option-container').hasClass('hide');
    element.find('.dropdown-option-container').toggleClass('hide', !isHidden);
  }

  selectOption(e) {
    const selected = $(e.target).closest('.dropdown-option');
    const value = selected.data('value');

    if (this.state.multiple) {
      if (value === '__all__') {
        const isSelectAll = !selected.hasClass('selected');
        this.shadowRoot.querySelectorAll('.dropdown-option').forEach(opt => {
          if (opt.dataset.value !== '__all__') {
            opt.classList.toggle('selected', isSelectAll);
            opt.querySelector('img').style.opacity = isSelectAll ? '1' : '0';
          }
        });
        selected.toggleClass('selected', isSelectAll);
        selected.find('img').css('opacity', isSelectAll ? '1' : '0');
      } else {
        selected.toggleClass('selected');
        selected.find('img').css('opacity', selected.hasClass('selected') ? '1' : '0');

        const allOption = $(this.shadowRoot.querySelector('.dropdown-option[data-value="__all__"]'));
        const others = [...this.shadowRoot.querySelectorAll('.dropdown-option')].filter(opt => opt.dataset.value !== '__all__');
        const allSelected = others.every(opt => opt.classList.contains('selected'));

        allOption.toggleClass('selected', allSelected);
        allOption.find('img').css('opacity', allSelected ? '1' : '0');
      }
    } else {
      this.setState({ currentlySelected: selected.index() });
      this.toggleOptions(e);
      this._syncHiddenInput();
    }
    this._syncHiddenInput();
    this.dispatchEvent(new Event('change'));
    this.updateDropdownBtnLabel();
  }

  setError(hasError) {
    if (hasError) {
      this.setAttribute('error', '');
    } else {
      this.removeAttribute('error');
    }
  }
  
  hasError() {
    return this.hasAttribute('error');
  }

  getValue() {
    if (this.state.multiple) return this.getSelectedValues();
    return this.state.options[this.state.currentlySelected]?.value || '';
  }

  reset () {
    this.state.currentlySelected = false;
    this.state.options.forEach(opt => opt.selected = false);
    this.render();
  }

  getSelectedValues() {
    const selected = this.shadowRoot.querySelectorAll('.dropdown-option.selected');
    return Array.from(selected).map(opt => opt.dataset.value);
  }

  updateDropdownBtnLabel() {
    const btn = this.shadowRoot.querySelector('.dropdown-btn');
    const iconClosed = this.shadowRoot.querySelector('.option-closed-icon');
    const iconOpen = this.shadowRoot.querySelector('.option-open-icon');
    const placeholderIcon = this.placeholderIcon || null;
  
    btn.textContent = ''; // Clear first
    if (placeholderIcon) btn.appendChild(placeholderIcon);

    const label = document.createElement('span');
    label.className = 'btn-label';
  
    if (this.state.multiple) {
      const allOptions = Array.from(this.shadowRoot.querySelectorAll('.dropdown-option'))
        .filter(opt => opt.dataset.value !== '__all__');
  
      const selected = this.shadowRoot.querySelectorAll('.dropdown-option.selected');
      const selectedOptions = Array.from(selected)
        .filter(opt => opt.dataset.value !== '__all__');
      const labels = selectedOptions.map(opt => opt.textContent.trim());
  
      // ✅ If all non-__all__ options are selected, display "All"
      if (selectedOptions.length === allOptions.length) {
        btn.appendChild(document.createTextNode('All'));
      } else {
        const testSpan = document.createElement('span');
        testSpan.style.visibility = 'hidden';
        testSpan.style.position = 'absolute';
        testSpan.style.fontSize = this.state.fontSize || window.getComputedStyle(btn).fontSize || '16px';
        testSpan.style.fontFamily = window.getComputedStyle(btn).fontFamily || 'inherit';
        this.shadowRoot.appendChild(testSpan);
  
        const maxWidth = btn.offsetWidth;
        let displayText = '';
        let remaining = 0;
  
        for (let i = 0; i < labels.length; i++) {
          const candidate = labels.slice(0, i + 1).join(', ');
          testSpan.textContent = candidate;
          if (testSpan.offsetWidth < maxWidth - 90) {
            displayText = candidate;
          } else {
            remaining = labels.length - i;
            break;
          }
        }
  
        if (remaining > 0) displayText += `... (+${remaining})`;
        this.shadowRoot.removeChild(testSpan);
  
        label.textContent = displayText || this.state.placeholder;
      }
    } else {
      const selectedOption = this.state.options[this.state.currentlySelected];
      label.textContent = selectedOption?.text || this.state.placeholder;
    }
  
    btn.appendChild(label);
    btn.appendChild(iconClosed);
    btn.appendChild(iconOpen);
  }

  _rebuildOptionsFromLightDOM() {
    const options = Array.from(this.querySelectorAll('option'));
    const optionsArray = options.map(opt => ({
        value: opt.value,
        text: opt.textContent,
        featureLocked: opt.hasAttribute('featureLocked')
    }));
    this.setState({
        options: optionsArray,
        currentlySelected: options.findIndex(opt => opt.selected)
    });
    this.render();
  }

  connectedCallback() {
    this._initializeHiddenInput();
    this._syncHiddenInput();
  }
  
  get value() {
    return this.getValue();
  }

  set value(v) {
    const idx = this.state.options.findIndex(o => String(o.value) === String(v));
    if (idx !== -1) {
      this.setState({ currentlySelected: idx });
      this._syncHiddenInput();
      this.updateDropdownBtnLabel();
    }
  }

   /**
   * Create a real hidden input so that FormData will pick up value.
   */
   _initializeHiddenInput() {
    if (this._hiddenInput) return;
    this._hiddenInput = document.createElement('input');
    this._hiddenInput.type = 'hidden';
    this._hiddenInput.name = this.getAttribute('name') || '';
    this.appendChild(this._hiddenInput);
    this._hiddenInput.value = this.getValue() || '';
  }

  /**
   * Update hidden input whenever selection changes
   */
  _syncHiddenInput() {
    if (this._hiddenInput) {
      this._hiddenInput.value = this.getValue() || '';
    }
  }
  

  render() {
    let optionsHTML = '';

    this.state.options.forEach((option, index) => {
      const isSelected = this.state.multiple
        ? false
        : index === this.state.currentlySelected && !this.state.navigator;
      optionsHTML += `
          <div class="dropdown-option${isSelected ? ' selected' : ''}${option.featureLocked ? ' feature-locked' : ''}" data-value="${option.value}" data-event_name="${option.text}">
            ${option.text}
            ${(option.featureLocked) ? '<i class="ml1 uil uil-arrow-circle-up size-18" style="color: #08ADA7"></i>' : ''}
            <img src="/images/icons/check-thin-green.svg" width="18" height="18">
          </div>`;
    });

    const template = /*html - Iconscout added within template to bring icon visibility within the shadowRoot */`
    <style>
        @import url('https://unicons.iconscout.com/release/v4.0.8/css/line.css');
        
        .dropdown-container { position: relative; }
        .dropdown-btn {
          box-sizing: border-box; 
          border: 1px solid #222;
          height: 36px;
          border-radius: 8px;
          background: #FFF;
          box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.30);
          font-weight: 400;
          display: inline-flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          user-select: none;
          padding: 0 16px;
          font-size: ${this.state.fontSize};
          color: ${this.state.fontColor};
          cursor: pointer;
          overflow: hidden;
        }
        .dropdown-option-container {
          box-sizing: border-box;
          position: absolute;
          right: 0;
          min-width: 150px;
          border: 1px solid #55B7B4;
          background-color: #fff;
          border-radius: 6px;
          box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
          z-index: 100;
          width: 100%;
        }
        .dropdown-option {
          padding: 10px 12px;
          display: flex;
          font-size: ${this.state.fontSize};
          color: ${this.state.fontColor};
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          position: relative;
        }
        .dropdown-option.feature-locked {
          justify-content: flex-start;
          gap: 6px;
        }
        .dropdown-option:hover, .dropdown-option.selected {
          background-color: #DDF9F8;
        }
        .dropdown-option img {
          opacity: 0;
          width: 18px;
          height: 18px;
          position: absolute;
          right: 12px;
        }
        .dropdown-option.selected img {
          opacity: 1;
        }
        .dropdown-option:first-child {
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
        }
        .dropdown-option:last-child {
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 6px;
        }
        .hide { display: none; }
        :host([full-width]) .dropdown-container,
        :host([full-width]) .dropdown-btn {
          width: 100%;
          box-sizing: border-box;
        }
        :host([full-width]) .dropdown-option-container {
          min-width: 100%;
        }

        :host([error]) .dropdown-btn {
          border: 1px solid #BC1B1B !important;
        }
        :host([legacy]) .dropdown-btn {
          border: 1px solid #a2a2a2;
          box-shadow: none;
          color: #a2a2a2;
          font-size: 14px;
        }

        :host([legacy]) .dropdown-option-container {
          border: 1px solid #a2a2a2;
          box-shadow: none;
        }
        :host([full-width]) {
          display: block;
          width: 100%;
        }
        
        :host([ellipsis]) .btn-label {
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        :host([dropdown-ellipsis]) .dropdown-option {
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: -webkit-fill-available;
        }

        .option-closed-icon, .option-open-icon {
          flex: 0 0 auto;
          margin-left: auto;
        }

      </style>
      <div class="flex justify-center">
        <div class="dropdown-container">
          <div class="dropdown-btn">
            ${this.state.currentlySelected !== false && !this.state.navigator ? this.state.options[this.state.currentlySelected]?.text : this.state.placeholder}
            <img class="option-closed-icon" src="/images/icons/chevron_down_black_small.svg" width="16" height="16">
            <img class="option-open-icon hide" src="/images/icons/chevron-up-green.svg" width="16" height="16">
          </div>
          <div class="dropdown-option-container hide">${optionsHTML}</div>
        </div>
      </div>
    `;

    this.loadTemplate(template);
    this.updateDropdownBtnLabel();
  }
}

customElements.define('select-element', SelectElement);

