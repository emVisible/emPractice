public abstract class Shape {
    public String id;
    public String name;
    public String author;
    public String price;
    public Shape(){}
    public Shape(Shape source){
        if (source != null) {
            this.id = source.id;
            this.name = source.name;
            this.author = source.author;
            this.price = source.price;
        }
    }

    public abstract Shape cloneBook();
}
