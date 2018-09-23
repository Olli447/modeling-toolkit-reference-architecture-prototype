/**
 * This class represents a Operation of a UML Class
 * */
export class UmlClassOperations {
    uml_class_operations_visibility: string;
    uml_class_operations_name: string;
    uml_class_operations_parameters: UmlClassOperationsParameters[];
    uml_class_operations_returntype: string;
    uml_class_operations_isClassScope: boolean;

    constructor(visibility: string, name: string, parameters: UmlClassOperationsParameters[], returntype: string, isClassScope: boolean) {
        this.uml_class_operations_visibility = visibility;
        this.uml_class_operations_name = name;
        this.uml_class_operations_parameters = parameters;
        this.uml_class_operations_returntype = returntype;
        this.uml_class_operations_isClassScope = isClassScope;
    }
}

/**
 * This class represents a UML Class Operation Parameter
 * */
export class UmlClassOperationsParameters {
    uml_class_operations_parameters_name: string;
    uml_class_operations_parameters_type: string;

    constructor(name: string, type: string) {
        this.uml_class_operations_parameters_name = name;
        this.uml_class_operations_parameters_type = type;
    }
}
