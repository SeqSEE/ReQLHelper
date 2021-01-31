/*
 * Copyright 2020 Cryptech Services
 *
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

const r = require('rethinkdb');
const Pool = require('rethinkdb-pool');

class ReQLHelper {
  private pool: any = null;
  constructor(
    database: string,
    user: string,
    password: string,
    host: string,
    port: number
  ) {
    this.pool = Pool(r, {
      host: host,
      port: port,
      user: user,
      password: password,
      database: database,
    });
  }

  public q(query: any, callback: (err: Error | null, res: any) => void): void {
    let p = this.pool;
    p.acquire(function (error: any, conn: any) {
      if (error) {
        callback(error, null);
      } else {
        p.run(query, (err: any, res: any) => {
          callback(err, res);
          if (conn) p.release(conn);
        });
      }
      if (conn) p.release(conn);
    });
  }

  public promiseQ(query: any): Promise<any> {
    return new Promise(
      (resolve: (result: any) => void, reject: (e: Error) => void) => {
        this.q(query, (e: Error | null, res: any) => {
          if (e) {
            reject(e);
          } else {
            resolve(res);
          }
        });
      }
    );
  }
}

export { ReQLHelper, r };
