/*
 * @Author: vance
 * @Date:   2017-08-02 00:23:09
 * @Last Modified by:   vance
 * @Last Modified time: 2017-08-03 18:04:06
 */
const ajax = {};
const cb = (res) => {
  if (res.status === 401) {
    return Promise.reject('Unauthorized.');
  } else {
    const json = res.json()
    json.then(function(data) {
      const token = data['access_token'];
      console.log(token);
      if (token) {
        localStorage.setItem('access_token', token);
      }
    })

    return json;
  }
};
ajax.get = function(url, params) {
return fetch(url, {
  method: 'GET',
  body: JSON.stringify(params),
  headers: {
    "Content-Type": "application/json",
    'Access-Token': localStorage.getItem('access_token') || ''
  }
})
  .then(cb)
}
ajax.download = function(url, filename) {
console.log(filename);
return fetch(url, {
  method: 'GET',
  headers: {
    'Access-Token': localStorage.getItem('access_token') || ''
  }
}).then(res => res.blob().then(blob => {
  var a = document.createElement('a');
  var url = window.URL.createObjectURL(blob);
  filename = filename || 'myfile';
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}))
}
ajax.post = function(url, params, type) {

if (type == "json") {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
      'Access-Token': localStorage.getItem('access_token') || ''
    }
  })
    .then(cb)
} else if (type == "form-data") {
  var formData = new FormData();

  for (var k in params) {
    formData.append(k, params[k]);
  }

  var request = {
    method: 'POST',
    headers: {
      "Content-Type": "multipart/form-data",
      'Access-Token': localStorage.getItem('access_token') || ''
    },
    body: formData
  };

  return fetch(url, request).then(cb);

}
var formBody = [];
for (var property in params) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(params[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");
return fetch(url, {
  method: 'POST',
  body: formBody,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    'Access-Token': localStorage.getItem('access_token') || ''
  }
})
  .then(cb)


}
export default ajax;
