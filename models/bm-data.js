import {
  JsonApiDataStore
} from '../miniprogram_npm/jsonapi-datastore/index.js'


class bm_alf_data {

  constructor(type, id) {
    this._bmstore = new JsonApiDataStore();
  }

  baseUrl() {
    let config = require('./bm_config.js');
    return config.bm_service_host + "/v2/";
  }

  urlForFindAllResource(res_name) {
    return this.baseUrl() + res_name;
  }

  urlForFindOneResource(res_name, id) {
    return this.baseUrl() + res_name + '/' + id;
  }

  urlForRelationshipsResource(res_name, res_ships, id) {
    return this.urlForFindOneResource(res_name, id) + '/' + res_ships
  }

  clearStore() {
    this._bmstore.reset();
  }

  removeOneModel(model) {
    this._bmstore.destory(model);
  }

  getPromisWithUrl(url) {
    let that = this;
    // wx.showLoading({
    //   title: '加载中',
    // });
    return new Promise(function(resolve, reject) {
      wx.request({
        method: 'GET',
        url: url,
        header: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'bearer ' + wx.getStorageSync('dd_token')
        },
        success(res) {
            var json = JSON.stringify(res.data)
            json = json.replace(/\u00A0|\u2028|\u2029|\uFEFF/g, '')
            var dealedJson = JSON.parse(json)
            console.log(dealedJson)
            let result = that._bmstore.sync(dealedJson)
            console.log(result);
            resolve(result)
            // wx.hideLoading();
        },
        fail(err) {
            // wx.hideLoading();
            console.log(err)
            reject(err)
        },
        complete() {
          // wx.hideLoading();
          console.log('complete!!')
        }
      })
    })
  }

  queryOneResource(res_name, res_id, queryParams) {
    if (queryParams == '') {
      return this.getPromisWithUrl(this.urlForFindOneResource(res_name, res_id));
    } else {
      return this.getPromisWithUrl(this.urlForFindOneResource(res_name, res_id) + '?' + queryParams);
    }
  }

  queryResource(res_name, queryParams) {
    if (queryParams == '') {
      return this.getPromisWithUrl(this.urlForFindAllResource(res_name));
    } else {
      return this.getPromisWithUrl(this.urlForFindAllResource(res_name) + '?' + queryParams);
    }
  }

  queryRelationshipsResource(res_name, id, rel_name) {
    return this.getPromisWithUrl(this.urlForRelationshipsResource(res_name, rel_name, id));
  }

  Query(res_name, queryParams) {
    let that = this;
    return this.queryResource(res_name, queryParams).then(res => {
      let arr = [],
        par = res;
      res.forEach(element => {
        let par = element;
        let relationships = [];
        element._relationships.forEach(rel_name => {
          let tmp = that.queryRelationshipsResource(res_name, element.id, rel_name).then(res => {
            return new Promise(function(resole, reject) {
              par[rel_name] = res;
              resole(par);
            })
          })
          relationships.push(tmp)
        })
        arr.push(Promise.all(relationships).then(res => {
          let tmp_res = res[0] || par;
          return new Promise(function(resolve, reject) {
            resolve(tmp_res)
          })
        }))
      });
      return Promise.all(arr)
    })
  }

  FindAll(res_name) {
    let that = this;
    return this.queryResource(res_name, '').then(res => {
      let arr = [];
      res.forEach(element => {
        let par = element;
        let relationships = [];
        element._relationships.forEach(rel_name => {
          let tmp = that.queryRelationshipsResource(res_name, element.id, rel_name).then(res => {
            return new Promise(function(resole, reject) {
              par[rel_name] = res;
              resole(par);
            })
          })
          relationships.push(tmp)
        })
        arr.push(Promise.all(relationships).then(res => {
          return new Promise(function(resolve, reject) {
            resolve(res[0])
          })
        }))
      });
      return Promise.all(arr)
    })
  }

  Find(res_name, id) {
    let that = this;
    return this.queryOneResource(res_name, id, '').then(res => {
      let par = res;
      let relationships = [];
      res._relationships.forEach(rel_name => {
        let tmp = that.queryRelationshipsResource(res_name, id, rel_name).then(res => {
          return new Promise(function(resole, reject) {
            par[rel_name] = res;
            resole(par);
          })
        })
        relationships.push(tmp)
      })
      return Promise.all(relationships).then(res => {
        return new Promise(function(resolve, reject) {
          let tmp_res = res[0] || par;
          resolve(tmp_res)
        })
      })
    })
  }

  createRecord(res_name, data) {
    let tmpDataFilterId = data,
      id = "";
    if (tmpDataFilterId.id) {
      id = tmpDataFilterId.id;
      delete tmpDataFilterId.id;
    }
    console.log(tmpDataFilterId);
    let keys = Object.keys(tmpDataFilterId);
    let attributes = {},
      tmp_data = {}
    keys.forEach(ele => {
      attributes[ele] = data[ele]
    })
    tmp_data.type = res_name;
    tmp_data.attributes = attributes;
    if (id != "") {
      tmp_data.id = id
    }
    return {
      data: tmp_data
    };
  }

  Save(res_name, data) {
    let that = this;

    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseUrl() + res_name,
        data: data,
        method: 'post',
        header: {
          'Content-Type': 'application/json', // 默认值
          'Accept': 'application/json',
          'Authorization': 'bearer ' + wx.getStorageSync('dd_token')
        },
        success(res) {
          var json = JSON.stringify(res.data)
          json = json.replace(/\u00A0|\u2028|\u2029|\uFEFF/g, '')
          var dealedJson = JSON.parse(json)
          let result = that._bmstore.sync(dealedJson)
          console.log(result)
          resolve(result)
        },
        fail(err) {
          console.log(err)
          reject(err)
        },
        complete() {
          // wx.hideLoading();
          console.log('complete!!!')
        }
      })
    })
  }

  DeleteRecord(res_name, id) {
    let that = this;

    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseUrl() + res_name + '/' + id,
        data: {},
        method: 'delete',
        header: {
          'Content-Type': 'application/json', // 默认值
          'Accept': 'application/json',
          'Authorization': 'bearer ' + wx.getStorageSync('dd_token')
        },
        success(res) {
          var json = JSON.stringify(res.data)
          json = json.replace(/\u00A0|\u2028|\u2029|\uFEFF/g, '')
          var dealedJson = JSON.parse(json)
          let result = that._bmstore.sync(dealedJson)
          resolve(result)
        },
        fail(err) {
          reject(err)
        },
        complete() {
          // wx.hideLoading();
        }
      })
    })
  }
}

var store = new bm_alf_data();

if ('undefined' !== typeof module) {
  module.exports = {
    store: store
  };
}