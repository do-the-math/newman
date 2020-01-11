import mongoose = require("mongoose");

export interface IRead<T extends mongoose.Document> {
  retrieve: () => Promise<T[]>;
  findById: (id: string) => Promise<T>;
}
