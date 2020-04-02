const { db } = require("../config");
const MongooseToDo = require("../models/mongoose/todo");
class ToDoFactory {
    constructor() {
        this.dataBaseDriver = db.driver;
    }

    static async add(toDo) {
        new ToDoFactory();
        //create() for saving many documents at a time. Create is basically using save() for each document
        return await MongooseToDo.create(toDo);
    }

    static async findAll(params) {
        new ToDoFactory();
        const query = params.completed ? { completed: params.completed } : {};
        const totalToDos = await ToDo.count(query);
        const paginatedData = new PaginatedData(new PaginationConfig(params.page, params.limit), totalToDos);
        const paginatedToDos = await ToDo.find(query)
            .limit(paginatedData.paginationConfig.limit())
            .skip(paginatedData.paginationConfig.offset());
        paginatedToDos.forEach(function (toDo) {
            paginatedData.addItem(ToDoEntity.createFromObject(toDo))
        });
        return paginatedData.paginatedItems();
    }

    static async findByToDoID(toDoID) {
        //findOne() returns at most one document and findMany will return all documents matching the query.
        const toDo = await ToDo.findOne({ toDoID: toDoID });
        if (toDo) {
            return ToDoEntity.createFromObject(toDo);
        }
    }

    static async update(toDo) {
        //updateOne() returns information of updated document e.g { n: 1, nModified: 0, ok: 1 }
        // findOneAndUpdate() returns updated document.
        //By default, findOneAndUpdate() returns the document as it was before update was applied.
        const updatedToDo = await ToDo.findOneAndUpdate(
            { toDoID: toDo.toDoID },
            toDo,
            {
                new: true // this will return the updated document
            }
        );
        if (updatedToDo) {
            return ToDoEntity.createFromObject(updatedToDo);
        }
    }

    static async remove(toDo) {
        //deleteOne will delete at most document matching the query.
        const result = await ToDo.findOneAndRemove(toDo);
        return result;
    }

    static async isPresent(toDo) {
        return await ToDo.exists(toDo);
    }
    static async first(limit = 1) {
        const toDos = await ToDo.find()
            .sort({ createdAt: -1 })
            .limit(limit);
        return toDos.map(toDo => ToDoEntity.createFromObject(toDo));
    }
    static async last(limit = 1) {
        const toDos = await ToDo.find()
            .sort({ createdAt: 1 })
            .limit(limit);
        return toDos.map(toDo => ToDoEntity.createFromObject(toDo));
    }

    static async count() {
        return ToDo.count({});
    }
}
module.exports = ToDoFactory;