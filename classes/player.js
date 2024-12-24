export class Player {
    constructor(id, name, age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    save(storageId) {
        localStorage.setItem(storageId, JSON.stringify(this));
        console.log(`Saved player ${storageId} to local storage.`);
    }

    static fromLocalStorage(storageId) {
        console.log(`Reading Player ${storageId} from the local storage`);
        const player1Data = localStorage.getItem(storageId);
        return Object.assign(new Player(), JSON.parse(player1Data));
    }
}
