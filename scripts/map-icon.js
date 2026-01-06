class MapIcon {
  constructor(id, type, fileName, iconName, attr = {}) {
    this.id = id;
    this.type = type;
    this.fileName = fileName;
    this.iconName = iconName;
    this.backgroundColor = attr.backgroundColor || '#0ABAB5';
    this.iconColor = attr.iconColor || '#FFFFFF';
    // Positional attributes
    this.x = attr.x || 0;
    this.y = attr.y || 0;
    this.width = attr.width || 0;
    this.height = attr.height || 0;
    this.rotate = attr.rotate || 0;
  }

  buildIconLibraryBoxes() {
    const dataIdAttr = this.id > 0 ? `data-id="${this.id}"` : '';
    return `
      <div class="col-3 mb1 flex flex-wrap rounded pointer user-select-none" ${dataIdAttr} data-type="${this.type}" data-icon_library="${this.fileName}" data-record="icon" data-back="square" data-asset="icon" data-icon="${this.fileName}">
          <div class="relative flex width-full overflow-hidden rounded-big" style="padding-top: 100%;">
            <div class="absolute all-0 height-full p2 width-full">
              <div class="height-full width-full p1 rounded" style="background-color: ${this.backgroundColor};">
                <div class="height-full width-full" style="background-color: ${this.iconColor}; -webkit-mask-image: url(/images/icons/map/${this.fileName}.svg); mask-image: url(/images/icons/map/${this.fileName}.svg); -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; -webkit-mask-size: ${['map-pin-1', 'map-pin-2', 'water-bottle'].includes(this.fileName) ? '80%' : '100%'}; -mask-size: ${['map-pin-1', 'map-pin-2', 'water-bottle'].includes(this.fileName) ? '80%' : '100%'}; -webkit-mask-position-y: center; -webkit-mask-position-x: center;"></div>
              </div>
            </div>
          </div>
        <div class="size-12 width-full text-center mt-half line-height-1" style="overflow-wrap: break-word;">${this.iconName}</div>
      </div>
    `;
  }

  buildIconPublic() {
    return `
      <div class="icon-svg flex" data-status="saved" data-id="${this.id}" style="height: ${this.height}px; position: absolute; left: ${this.x}px; top: ${this.y}px; transform: rotate(${this.rotate}deg); width: ${this.width}px; z-index: 1;">
						<div class="icon-bg rounded" style="background-color: ${this.backgroundColor}; height: 100%; padding: ${(this.height * .1)}px ${(this.width * .1)}px;  width: 100%;">
							<div class="icon-tc height-full width-full" style="background-color: ${this.iconColor}; -webkit-mask-image: url(/images/icons/map/${this.fileName}.svg); mask-image: url(/images/icons/map/${this.fileName}.svg); -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; -webkit-mask-size: contain; -mask-size: contain;"></div>
						</div>
					</div>
    `;
  }
}