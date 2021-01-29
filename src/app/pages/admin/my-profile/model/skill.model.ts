export class SkillItem {
    name : String;
    point : Number;

    constructor ( {name : name , point : point }) {
        this.name = name ;
        this.point = point ? point : 0;
    }
}