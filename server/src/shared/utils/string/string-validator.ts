export function IsString(str: any): str is string{
    return typeof str === "string";
}