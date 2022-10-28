import Global from "@utils/global";
import baseApi from "./base";
import UtilService from "@utils/utils";
import * as config from "../config";
import base64 from 'base-64';

module.exports = {
  getUserDetail(cb) {
    baseApi.basicApi('/v1/user/details', 'POST', {
      "Request": "",
      "Flags": {}
    }, (err, res) => {
      if (!err && res) {
        Global.currentUser = res
        UtilService.saveLocalStringData('email', Global.currentUser.contactInformation.email);
      }
      cb(err, res)
    })
  },

  update(userData, cb) {
    baseApi.basicApi('/v1/user/update', 'POST', {
      "request": userData,
      "Flags": {}
    }, (err, res) => {
      if (err == null) {
        Global.currentUser = res
      }
      cb(err, res)
    })
  },

  updateDevice(cb) {
    var deviceInfo = {}
    baseApi.basicApi('/v1/user/device/update', 'POST', {
      "request": deviceInfo
    }, (err, res) => {
      cb(err, res)
    })
  },
  
  setPassword(password, cb) {
    var userData = Global.currentUser
    userData.password = password
    baseApi.basicApi('/v1/user/update', 'POST', {
      "request": userData,
      "Flags": {}
    }, (err, res) => {
      if (err == null) {
        Global.currentUser = res
      }
      cb(err, res)
    })
  },
  
  getLedgerBalance(min, max, page, pageSize, cb) {
    baseApi.basicApi('/v1/ledgerbalance', 'POST', {
      "Request": {
        "Filters": [
          {
            "MinValue": min, //"2017-06-01T00:00:00",
            "MaxValue": max, //"2017-07-29T00:00:00",
            "MinMaxList": [],
            "Name": "daterange"
          },
        ],
        "PageInfo": {
          "CurrentPage": page||1,
          "PageLength": pageSize||10
        }
      },
      "Flags": {}
    }, (err, res) => {
      cb(err, res)
    })
  },
};
