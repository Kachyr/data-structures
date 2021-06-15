class ListNode<T> {
  constructor(public data: T, public next: ListNode<T> | null = null) {}
}

interface ILinkedList<T> {
  append(data: T): void;
  prepend(data: T): void;
  insertAfter(after: T, data: T): void;
  find(data: T): ListNode<T> | null;
  toArray(): ListNode<T>[];
  remove(data: T): void;
  size(): number;
}

class LinkedList<T> implements ILinkedList<T> {
  private head: ListNode<T> | null;
  private tail: ListNode<T> | null;
  private length: number = 0;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(data: T) {
    //Appending element in list
    const node = new ListNode(data);

    if (this.tail) {
      this.tail.next = node;
    }

    if (!this.head) {
      this.head = node;
    }

    this.tail = node;
  }

  prepend(data: T) {
    //Prepend element in list
    const node = new ListNode(data, this.head);

    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }
  }

  insertAfter(after: T, data: T) {
    // inserting element in particular position
    const found = this.find(after);

    if (!found) {
      return null;
    }

    found.next = new ListNode(data, found.next);
  }

  find(data: T): ListNode<T> | null {
    //Search a certain by checking value in it, via callback
    if (!this.head) {
      return null;
    }

    let current: ListNode<T> | null = this.head;
    while (current) {
      if (current.data === data) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  toArray() {
    //Returns a list of nodes
    const output = [];
    let current = this.head;

    while (current) {
      output.push(current);
      current = current.next;
    }

    return output;
  }

  remove(data: T) {
    //Deletes an element in list by pointing data in it
    if (!this.head) {
      return null;
    }

    while (this.head && this.head.data === data) {
      this.head = this.head.next;
    }

    let current = this.head;
    while (current?.next) {
      if (current.next.data === data) {
        current.next = current.next.next;
      } else {
        current = current.next;
      }
    }

    if (this.tail?.data === data) {
      this.tail = current;
    }
  }

  size() {
    return this.length;
  }
}

const list = new LinkedList();
list.prepend('Hi');
list.append('My');
list.append('name');
// list.append('is')
list.append('Slim');
list.append('Shady');

list.insertAfter('name', 'is');

list.prepend(42);
list.append(24);

list.remove(42);

console.log(list.find(24));
