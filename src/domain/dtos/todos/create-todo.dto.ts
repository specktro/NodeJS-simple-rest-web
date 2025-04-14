export class CreateToDoDTO {
    private constructor(
        public readonly text: string,
    ) { }

    static create(properties: {[key: string]: any}): [string?, CreateToDoDTO?] {
        const {text} = properties

        if (!text) {
            return ['Text property is required', undefined]
        }

        return [undefined, new CreateToDoDTO(text)]
    }
}