import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable } from 'rxjs';

@Injectable()
export class BDService {

    constructor(public bd: AngularFireDatabase) { 
    }

    listAndWatch<Type>(entity: string): Observable<Type[]> {
        return this.bd.list<Type>(`/${entity}`).valueChanges();
    }

    list<Type>(entity: string): Promise<Type[]> {
        return new Promise<Type[]>((resolve, reject) => {
            this.bd.list<Type>(`/${entity}`)
                .valueChanges()
                .subscribe(
                    result => resolve(result),
                    error => reject(error)
                );
        });
    }

    search<Type>(entity: string, filterProperty: string, filterValue: any): Promise<Type[]> {
        return new Promise<Type[]>((resolve, reject) => {
            this.bd.list<Type>(`/${entity}`, ref => ref.orderByChild(filterProperty).equalTo(filterValue))
                .snapshotChanges()
                .subscribe(
                    items => {
                        const typedItems: Type[] = [];

                        items.forEach(item => {
                            const typedItem: Type = item.payload.val();
                            typedItem['uid'] = item.key;
                            typedItems.push(typedItem);
                        });

                        resolve(typedItems);
                    },
                    error => reject(error)
                );
        });
    }

    listByKey<Type>(entity: string, uid: string): Promise<Type[]> {
        return this.list<Type>(`/${entity}/${uid}`);
    }

    listWithUIDs<Type>(entity: string): Promise<Type[]> {
        return new Promise<Type[]>((resolve, reject) => {
            this.bd.list<Type>(`/${entity}`)
                .snapshotChanges()
                .subscribe(
                    items => {
                        const typedItems: Type[] = [];

                        items.forEach(item => {
                            const typedItem: Type = item.payload.val();
                            typedItem['uid'] = item.key;
                            typedItems.push(typedItem);
                        });

                        resolve(typedItems);
                    },
                    error => reject(error)
                );
        });
    }

    getObject<Type>(entity: string): Promise<Type> {
        return new Promise<Type>((resolve, reject) => {
            this.bd.object<Type>(`/${entity}`)
                .valueChanges()
                .subscribe(
                    result => resolve(result),
                    error => reject(error)
                );
        });
    }

    getObjectByKey<Type>(entity: string, uid: string): Promise<Type> {
        return new Promise<Type>((resolve, reject) => {
            this.getObject<Type>(`/${entity}/${uid}`)
                .then(object => {
                    object['uid'] = uid;
                    resolve(object);
                }).catch(error => reject(error));
        });
    }

    getObjectAndWatch<Type>(entity: string): Observable<Type> {
        return this.bd.object<Type>(`/${entity}`).valueChanges();
    }

    insert<Type>(entity: string, object: Type): Promise<void> {
        return this.bd.object<Type>(`/${entity}`)
            .set(object);
    }

    insertInList<Type>(entity: string, object: Type): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.bd.list<Type>(`/${entity}`)
                .push(object)
                .then(item => resolve(item.key));
        });
    }

    update(entity: string, uid: string, object): Promise<void> {
        return this.bd.object(`/${entity}/${uid}`).update(object);
    }

    updateList(entity: string, uid: string, object): Promise<void> {
        return this.bd.object(`/${entity}/${uid}`).set(object);
    }

    remove(entity: string, uid: string): Promise<void> {
        return this.bd.object(`/${entity}/${uid}`).remove();
    }
}
