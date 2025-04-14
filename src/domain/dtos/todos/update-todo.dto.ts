export class UpdateToDoDTO {
    private constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date,
    ) { }

    get values() {
        const anObject: {[key: string]: any} = {}

        if (this.text) {
            anObject.text = this.text
        }

        if (this.completedAt) {
            anObject.completedAt = this.completedAt
        }

        return anObject
    }

    static create(properties: {[key: string]: any}): [string?, UpdateToDoDTO?] {
        const {id, text, completedAt} = properties

        if (!id || isNaN(Number(id))) {
            return ['id must be a valid number', undefined]
        }

        if (completedAt) {
            const newCompletedAt = new Date(completedAt)
            if (newCompletedAt.toString() === 'Invalid Date' ) {
                return ['completedAt must be a valid date', undefined]
            }
        }

        return [undefined, new UpdateToDoDTO(id, text, completedAt)]
    }
}