import { JsonApiDataStore } from '../miniprogram_npm/jsonapi-datastore/index.js'

var bmstore = new JsonApiDataStore();

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function genOneKid(id,name, nick_name, dob, gender, guardian_role) {
  let kid = {
    data: {
      id: id,
      type: "BmKid",
      attributes: {
        name: name,
        nickname: nick_name,
        dob: dob,
        gender: gender,
        guardian_role: guardian_role
      }
    }
  }
  bmstore.sync(kid)
}

function bmstoreReset() {
  return bmstore.reset();
}
function bmstoreDestroy() {
  let kids = queryAllLocalKids();
  return bmstore.destroy(kids);
}
function bmstoredelete(model) {
  let kids = queryAllLocalKids();
  return bmstore.destroy(model)
}

function queryAllLocalKids() {
  // bmstore.reset()
  return bmstore.findAll('BmKid');
}

function queryLocalKidByID(kidid) {
  return bmstore.find('BmKid', kidid);
}

function saveAllKidOnStorage() {
  let kids = queryAllLocalKids();
  let result = [];
  for (let idx = 0; idx < kids.length; idx++) {
    result.push(kids[idx].serialize());
  }
  wx.setStorage({
    key: 'kids',
    data: JSON.stringify(result),
  })
}

function loadAllKidOnStrage(callback) {
  bmstore.reset();
  wx.getStorage({
    key: 'kids',
    success: function(res) {
      let result = JSON.parse(res.data);
      for (let idx = 0; idx < result.length; idx++) {
        bmstore.sync(result[idx]);
      }
      callback.onSuccess(result)
    },
  })
}

module.exports = {
  genOneKid: genOneKid,
  loadAllKidOnStrage: loadAllKidOnStrage,
  queryAllLocalKids: queryAllLocalKids,
  queryLocalKidByID: queryLocalKidByID,
  saveAllKidOnStorage: saveAllKidOnStorage,
  bmstoreReset: bmstoreReset,
  bmstoreDestroy: bmstoreDestroy,
  bmstoredelete: bmstoredelete
}