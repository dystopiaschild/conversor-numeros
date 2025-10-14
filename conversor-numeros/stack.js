//@ts-nocheck
class StackNode{
    #value; //valor del nodo
    #next; //nodo siguiente
    constructor(xvalue){
        this.#value=xvalue;
        this.#next=null;
    }
    get_Value(){return this.#value;}
    get_Next(){return this.#next;}
    set_Next(newNext){this.#next=newNext}
}

class Stack{
    #size; //contador de elementos de la pila
    #top; //elemento superior de la pila
    constructor(){
        this.#top=null;
        this.#size=0;
    }

    is_Empty(){return this.#size===0;}
    
    //insertar elementos en la pila
    push_Item(value){
        const newNode=new StackNode(value);
        newNode.set_Next(this.#top);
        this.#top=newNode;
        this.#size++;
        return true;
    }

    //suprimir elementos de la pila
    pop_Item(){
        if(this.is_Empty()) throw new Error('La pila esta vacia!');
        let value=this.#top.get_Value();
        this.#top=this.#top.get_Next();
        this.#size--;
        return value;
    }
}

module.exports={ StackNode, Stack }; //la advertencia chequea para typescript, funciona perfecto con node.js