import {ElementStates} from "../../types/element-states";

interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  getQueue: () => T[];
  clearQueue: () => void;
  getLength: () => number;
  getTail: () => number;
  getHead: () => number;
  getSize: () => number;
}

export class Queue<T> implements IQueue<T> {
  private container: (T)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;
  private item = {value: "", color: ElementStates.Default};

  constructor(size: number) {
    this.size = size;
    this.container = Array(size).fill(this.item);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    if (this.tail === this.size) {
      this.container[this.tail % this.size] = item;
      this.tail = 0;
    }
    if (this.head < this.size) {
      this.container[this.tail % this.size] = item;
      this.tail++;
    }
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.container[this.head % this.size] = this.item as any;
    this.head++;
    this.length--;
    if(this.head === this.size) {
      this.head = 0;
      this.tail = 0;
    }
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.length ? this.container[this.head % this.size] : null;
  };

  isEmpty = () => this.length === 0;

  getQueue = (): T[] => {
    return this.container;
  };
  clearQueue = (): void => {
    this.container = Array(this.size).fill(this.item);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }
  getLength = (): number => {
    return this.length;
  };
  getTail = (): number => {
    return this.tail;
  };
  getHead = (): number => {
    return this.head;
  };
  getSize = (): number => {
    return this.size;
  };
}
