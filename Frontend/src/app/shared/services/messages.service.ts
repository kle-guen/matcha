import {MessageDto} from "../../data/dto/receive/message.dto";
import {Injectable} from "@angular/core";

@Injectable({
	providedIn: 'root'
})
export class MessagesService {

	/**
	 * The map.
	 * @private
	 */
	private map: Map<number, MessageDto[]> = new Map();

	/**
	 * Add an item to the multimap.
	 * @param key The key.
	 * @param item The item.
	 */
	add(key: number, item: MessageDto): void {
		if (!this.map.has(key)) {
			this.map.set(key, []);
		}
		const items = this.map.get(key);

		if (items) {
			const index = this.binarySearchInsert(items, item.date);
			items.splice(index, 0, item);
		}
	}

	/**
	 * Get the items by key.
	 * @param key The key.
	 */
	get(key: number): MessageDto[] | undefined {
		return this.map.get(key);
	}

	/**
	 * Remove an item by key.
	 * @param key The key.
	 * @param date The date.
	 */
	removeByDate(key: number, date: Date): void {
		const items = this.map.get(key);
		if (items) {
			this.map.set(key, items.filter(item => item.date.getTime() !== date.getTime()));
		}
	}

	/**
	 * Remove an item by key.
	 * @param key The key.
	 */
	removeKey(key: number): void {
		this.map.delete(key);
	}

	/**
	 * Check if the multimap has a key.
	 * @param key The key.
	 */
	hasKey(key: number): boolean {
		return this.map.has(key);
	}

	/**
	 * For each item in the multimap.
	 */
	forEach(callback: (key: number, items: MessageDto[]) => void): void {
		this.map.forEach((items, key) => {
			callback(key, items);
		});
	}

	/**
	 * Get the size of the multimap.
	 */
	size(): number {
		return this.map.size;
	}

	/**
	 * Search where the item must be inserted.
	 */
	private binarySearchInsert(items: MessageDto[], date: Date): number {
		let low = 0;
		let high = items.length;

		while (low < high) {
			const mid = Math.floor((low + high) / 2);
			if (items[mid].date.getTime() < date.getTime()) {
				low = mid + 1;
			} else {
				high = mid;
			}
		}
		return low;
	}
}
