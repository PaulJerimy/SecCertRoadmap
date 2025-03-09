export const renderControlCheckbox = (
  controlGroup: string,
  checkboxName: string,
  labelName: string,
  classes: string,
  checked: boolean,
  hideControl: boolean
) => {
  const control = document.getElementById("controls")!;

  const controlGroupElement = getOrCreateControlGroup(control, controlGroup);
  const container = document.createElement("div");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");

  label.innerHTML = labelName;
  label.className = `control-label ${checkboxName}-label`;
  label.htmlFor = checkboxName;

  checkbox.type = "checkbox";
  checkbox.id = checkboxName;
  checkbox.name = checkboxName;
  checkbox.className = classes;
  checkbox.checked = checked;

  container.hidden = hideControl;

  controlGroupElement.appendChild(container);
  container.appendChild(checkbox);
  container.appendChild(label);
};

export const renderRadioControl = () => {
  const control = document.getElementById("controls")!;
  const controlGroupElement = document.createElement("div");

  controlGroupElement.className = "control-group display-controls";
  control.appendChild(controlGroupElement);

  ["grid", "list"].forEach((displayType) => {
    const container = document.createElement("div");
    const label = document.createElement("label");
    const radio = document.createElement("input");

    label.innerHTML = displayType;
    label.className = `control-label ${displayType}-label`;
    label.htmlFor = displayType;

    radio.type = "radio";
    radio.id = displayType;
    radio.name = "display";
    radio.checked = displayType === "grid";
    radio.value = displayType;

    controlGroupElement.appendChild(container);
    container.appendChild(radio);
    container.appendChild(label);
  });
};

const getOrCreateControlGroup = (control: HTMLElement, controlGroup: string): Element => {
  const existingControlGroupElement = control.getElementsByClassName(controlGroup);

  if (existingControlGroupElement.length > 0) return existingControlGroupElement[0];

  const controlGroupElement = document.createElement("div");

  controlGroupElement.className = `control-group ${controlGroup}`;
  control.appendChild(controlGroupElement);

  return controlGroupElement;
};
