class DeepFreeze<T> {
  private frozen: string;

  constructor(objectToFreeze: T) {
    this.frozen = JSON.stringify(objectToFreeze);
  }

  unfreeze() {
    return JSON.parse(this.frozen) as T;
  }
}

export default DeepFreeze;
