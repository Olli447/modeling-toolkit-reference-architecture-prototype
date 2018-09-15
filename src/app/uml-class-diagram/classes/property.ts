export class UmlClassAttributes {
    uml_class_attributes_visibility: string;
    uml_class_attributes_name: string;
    uml_class_attributes_type: string;
    uml_class_attributes_value: string;
    uml_class_attributes_isClassScope: boolean;

    constructor(visibility: string, name: string, type: string, value: string, isClassScope: boolean) {
        this.uml_class_attributes_visibility = visibility;
        this.uml_class_attributes_name = name;
        this.uml_class_attributes_type = type;
        this.uml_class_attributes_value = value;
        this.uml_class_attributes_isClassScope = isClassScope;
    }
}
