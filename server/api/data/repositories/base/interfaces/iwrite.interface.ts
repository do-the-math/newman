import mongoose = require("mongoose");

export interface IWrite<T extends mongoose.Document> {
  create: (item: T) => Promise<T>;
  update: (id: mongoose.Types.ObjectId, item: T) => Promise<T>;
  delete: (id: string) => Promise<boolean>;
}
