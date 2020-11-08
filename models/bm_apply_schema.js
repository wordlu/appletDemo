import { JsonApiDataStore } from '../miniprogram_npm/jsonapi-datastore/index.js'

var bmstore = new JsonApiDataStore();
// var bmmulti = new JsonApiDataStore();

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function genApplyeePushQuery(except_time, course_name, contact, course_type, reservableid) {
  let now = new Date().getTime()
  let config = require('./bm_config.js')
  let lm = require('./bm_applyee_schema.js');
  let localApplyee = lm.queryLocalApplyee();
  console.log('---')
  console.table(localApplyee)
  let applyee = localApplyee.id;

  return {
    data: {
      id: guid(),
      type: "BmApply",
      attributes: {
        apply_time: now,
        except_time: except_time,
        brandId: config.bm_baizao_id,
        applyeeId: applyee,
        courseName: course_name,
        contact: contact,
        courseType: course_type,
        reservableId: reservableid
      },
      relationships: {
        Kids: {
          data: []
        },
        Applyee: {
          data: {}
        }
      }
    },
    included: []
  }
}

function pushApply(except_time, course_name, contact, course_type, reservableid, kids, callback) {
  var lm = require('./bm_applyee_schema.js');
  bmstore.reset();
  let query_payload = genApplyeePushQuery(except_time, course_name, contact, course_type, reservableid);
  let result = bmstore.sync(query_payload);
  result.Kids = kids
  result.Applyee = lm.queryLocalApplyee();

  let inc = [];
  for (let idx = 0; idx < result.Kids.length; idx++) {
    let tmp = result.Kids[idx].serialize();
    inc.push(tmp.data);
  }
  let applyee = result.Applyee.serialize();
  inc.push(applyee.data);

  let rd_tmp = JSON.parse(JSON.stringify(result.serialize()));
  rd_tmp['included'] = inc;
  let dt = JSON.stringify(rd_tmp);
  console.log(dt);

  let config = require("./bm_config.js");
//   wx.showLoading({
//     title: '加载中',
//   });
  wx.request({
    url: config.bm_service_host + '/api/v1/pushapply/0',
    data: dt,
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
      let result = bmstore.sync(dealedJson)
      console.log(result)
      callback.onSuccess(result);
    },
    fail(err) {
      console.log('fail!!!')
      callback.onFail(err);
    },
    complete() {
    //   wx.hideLoading();
      console.log('complete!!!')
    }
  })
}

function genMultiQuery(param) {
  let eq2 = guid();
  let eq1 = guid();
  let ne = guid();

  let lm = require('./bm_applyee_schema.js');
  let config = require('./bm_config.js')
  let localApplyee = lm.queryLocalApplyee();
  let applyee = localApplyee.id;

  
  let today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  today = today.getTime();
    return {
      data: {
        id: guid(),
        type: "Request",
        attributes: {
          res: "BmApply"
        },
        relationships: {
          Eqcond: {
            data: [
              {
                id: eq1,
                type: "Eqcond"
              }, {
                id: eq2,
                type: "Eqcond"
              }
            ]
          },
          Necond: {
            data: [
              {
                id: ne,
                type: "Necond",
              }
            ]
          }
        }
      },
      included: [
        {
          id: eq1,
          type: "Eqcond",
          attributes: {
            key: "brandId",
            val: config.bm_baizao_id
          }
        },
        {
          id: eq2,
          type: "Eqcond",
          attributes: {
            key: "applyeeId",
            val: applyee
          }
        },
        {
          id: ne,
          type: "Necond",
          attributes: {
            key: "courseType",
            val: -1
          }
        }
      ]
    }
}

function queryMultiObjects(callback) {
  bmstore.reset();

//   let query_yard_payload = genMultiQuery();
//   let rd = bmmulti.sync(query_yard_payload);
//   let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));
//   let brand = rd.Eqcond[0].serialize();
//   let applyee = rd.Eqcond[1].serialize();
//   let ne = rd.Necond[0].serialize();
//   rd_tmp['included'] = [brand.data, applyee.data, ne.data];
//   let dt = JSON.stringify(rd_tmp);
  
  var config = require('./bm_config.js')
  
  wx.showLoading({
    title: '加载中',
  });

  wx.request({
    url: config.bm_service_host + '/v2/applies?brandId=' + config.bm_baizao_id + "&applicantId=" + wx.getStorageSync('dd_id'),
    // data: dt,
    method: 'GET',
    header: {
      'Content-Type': 'application/json', // 默认值
      'Accept': 'application/json',
      'Authorization': 'bearer ' + wx.getStorageSync('dd_token')
    },
    success(res) {
      var json = JSON.stringify(res.data)
      json = json.replace(/\u00A0|\u2028|\u2029|\uFEFF/g, '')
      var dealedJson = JSON.parse(json)
      let result = bmstore.sync(dealedJson)
      console.log(result)
      callback.onSuccess(result)
    },
    fail(err) {
      callback.onFail(err)
    },
    complete() {
      wx.hideLoading();
      console.log('complete!!!')
    }
  })
}

function queryApplyInfo(reservableid, callback) {
    bmstore.reset();

    let query_yard_payload = genIdQuery(reservableid);
    let rd = bmstore.sync(query_yard_payload);
    let rd_tmp = JSON.parse(JSON.stringify(rd.serialize()));

    let inc = rd.Eqcond[0].serialize();
    rd_tmp['included'] = [inc.data];
    let dt = JSON.stringify(rd_tmp);
    let token = wx.getStorageSync('dd_token');
    console.log('token: ' + token)

    let config = require('./bm_config.js');
    //   wx.showLoading({
    //     title: '加载中',
    //   });
    wx.request({
        url: config.bm_service_host + '/api/v1/findapplydetail/0',
        data: dt,
        method: 'post',
        header: {
            'Content-Type': 'application/json', // 默认值
            'Accept': 'application/json',
            'Authorization': 'bearer ' + token
        },
        success(res) {
            var json = JSON.stringify(res.data)
            json = json.replace(/\u00A0|\u2028|\u2029|\uFEFF/g, '')
            var dealedJson = JSON.parse(json)
            let result = bmmulti.sync(dealedJson)
            console.log(result)
            callback.onSuccess(result)
        },
        fail(err) {
            callback.onFail(err)
        },
        complete() {
            //   wx.hideLoading();
            console.log('complete!!!')
        }
    })
}

function genIdQuery(tmpid) {
    let eq = guid();
    return {
        data: {
            id: guid(),
            type: "Request",
            attributes: {
                res: "BmApply"
            },
            relationships: {
                Eqcond: {
                    data: [
                        {
                            id: eq,
                            type: "Eqcond"
                        }
                    ]
                }
            }
        },
        included: [
            {
                id: eq,
                type: "Eqcond",
                attributes: {
                    key: "id",
                    val: tmpid
                }
            }
        ]
    }
}


module.exports = {
  pushApply: pushApply,
  queryMultiObjects: queryMultiObjects,
  queryApplyInfo: queryApplyInfo
}