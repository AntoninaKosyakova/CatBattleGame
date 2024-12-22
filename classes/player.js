export class Player {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    static save(storageId, player) {
        if (player instanceof Player) {
            localStorage.setItem(storageId, JSON.stringify(player));
            console.log(`Saved player ${storageId} to local storage.`);
        } else {
            console.error("The argument must be an instance of the Player class.");
        }
    }

    static fromLocalStorage(storageId) {
        console.log(`Reading Player ${storageId} from the local storage`);
        const player1Data = localStorage.getItem(storageId);
        return Object.assign(new Player(), JSON.parse(player1Data));
    }
}
