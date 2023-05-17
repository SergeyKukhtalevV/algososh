export class Node<T> {
  value: T
  next: Node<T> | null

  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  insertAt: (element: T, position: number) => void;
  getSize: () => number;
}

class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  private length: number;
  private lastAddedNode: Node<T> | null;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.length = 0;
    this.lastAddedNode = null;
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      const node = new Node(element);

      // добавить элемент в начало списка
      if (index === 0) {
        const temp = this.head;
        this.head = node;
        node.next = temp;
      } else {
        let curr = this.head;
        let currIndex = 0;
        while (curr && currIndex < index - 1) {
          currIndex++;
          curr = curr.next;
        }
        if (curr) {
          node.next = curr.next;
          curr.next = node;
        }
      }

      this.size++;
    }
  }

  append(element: T) {
    const node = new Node(element);
    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
      this.length++;
      return this;
    }
    this.tail.next = node;
    this.tail = node;
    this.length++;
    this.lastAddedNode = node;
    return this;
  }

  prepend(element: T) {
    const node = new Node(element);

    this.head = node;

    if (this.tail === null) {
      this.tail = node;
      this.length++;
    }
    this.length++;
    this.lastAddedNode = node;
    return this;
  }

  getSize() {
    return this.size;
  }

}
