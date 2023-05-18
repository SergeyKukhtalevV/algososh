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
  deleteTail: () => Node<T> | null;
  deleteHead: () => Node<T> | null;
  deleteByIndex: (index: number) => Node<T> | null;
  getLastAddedNode: () => Node<T> | null;
  findByIndex: (index: number) => Node<T> | null;
  toArray: () => Node<T>[];
  getSize: () => number;
  getLength: () => number;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  private length: number;
  private lastAddedNode: Node<T> | null;

  constructor(values: T[] = []) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.length = 0;
    this.lastAddedNode = null;
    for (let val of values) {
      this.append(val);
    }
  }

  prepend(element: T) {
    const node = new Node(element);

    this.head = node;

    if (this.tail === null) {
      this.tail = node;
    }
    this.length++;
    this.lastAddedNode = node;
    return this;
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

  deleteTail() {
    if (!this.tail) {
      return null;
    }
    const deletedTail = this.tail;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      this.length = 0;
      return deletedTail;
    }

    let curr = this.head;
    if (curr) {
      while (curr.next) {

        if (!curr.next.next) {
          curr.next = null;
        } else {
          curr = curr.next;
        }
      }

      this.tail = curr;
      this.length--;
      return deletedTail;
    }
    return null;
  }

  deleteHead() {
    if (!this.head) {
      return null;
    }
    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    this.length--;
    return deletedHead;
  }

  deleteByIndex(index: number) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index out of bounds");
    }

    let deletedNode = null;

    if (index === 0) {
      return this.deleteHead();
    }
    if (index === this.length - 1) {
      return this.deleteTail();
    } else {
      let prev = null;
      let curr = this.head;
      for (let i = 0; i < index; i++) {
        if (curr) {
          prev = curr;
          curr = curr.next;
        }
      }
      deletedNode = curr;
      if (prev && curr) {
        prev.next = curr.next;
      }
      this.length--;
    }
    return deletedNode;
  }

  findByIndex(index: number) {
    if (index < 0 || index >= this.length) {
      return null;
    }
    let curr = this.head;
    let i = 0;
    while (i < index) {
      if(curr) {
        curr = curr.next;
      }
      i++;
    }
    return curr;
  }

  toArray() {
    const nodes: Node<T>[] = [];
    let curr = this.head;

    while (curr) {
      nodes.push(curr);
      curr = curr.next;
    }
    return nodes;
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      if (index === 0) {
        this.prepend(element);
      }
      if (index === this.length - 1) {
        this.append(element);
      } else {
        const node = new Node(element);
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
        this.length++;
      }
    }
  }


  getSize() {
    return this.size;
  }

  getLength() {
    return this.length;
  }

  getLastAddedNode() {
    return this.lastAddedNode;
  }
}
