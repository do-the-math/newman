import mongoose = require('mongoose');
import { IRead } from './interfaces/iread.interface';
import { IWrite } from './interfaces/iwrite.interface';

export class RepositoryBase<T extends mongoose.Document>
  implements IRead<T>, IWrite<T> {
  private model: mongoose.Model<mongoose.Document>;

  constructor(schemaModel: mongoose.Model<mongoose.Document>) {
    this.model = schemaModel;
  }

  public create(item: T): Promise<T> {
    return new Promise((resolve, reject) => {
      this.model.create(item, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res as T);
        }
      });
    });
  }

  public retrieve(cond?: {}, filterFields?: {}): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.model.find(cond, filterFields, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res as T[]);
        }
      });
    });
  }

  public retrieveWithPopulate(populateFields: string): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.model
        .find()
        .populate(populateFields)
        .exec()
        .then((res) => resolve(res as T[]))
        .catch((err) => reject(err));
    });
  }

  public findByIdWithPopulate(
    id: string,
    populateFields: string
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      this.model
        .findById(id)
        .populate(populateFields)
        .then((res) => resolve(res as T))
        .catch((err) => reject(err));
    });
  }

  public findOne(cond): Promise<T> {
    return new Promise((resolve, reject) => {
      this.model.findOne(cond, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res as T);
        }
      });
    });
  }

  public update(id, item: T): Promise<T> {
    return new Promise((resolve, reject) => {
      this.model.updateOne(
        { _id: mongoose.Types.ObjectId(id) },
        item,
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res as T);
          }
        }
      );
    });
  }

  public delete(id: string): Promise<true> {
    return new Promise((resolve, reject) => {
      this.model.deleteOne({ _id: this.toObjectId(id) }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

  public findById(id: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.model.findById(id, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res as T);
        }
      });
    });
  }

  public findByIdAndUpdate(id: string, cond: {}): Promise<T> {
    return new Promise((resolve, reject) => {
      this.model.findByIdAndUpdate(id, cond, { new: true }, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res as T);
        }
      });
    });
  }

  private toObjectId(id: string): mongoose.Types.ObjectId {
    return mongoose.Types.ObjectId.createFromHexString(id);
  }
}
