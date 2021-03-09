
import React from 'react'
import ToastServive from 'react-material-toast';
const toast = ToastServive.new({
    place:'bottomRight',
    duration:2,
    maxCount:8
  });
export function imageValid(e) {
    var formData = new FormData();
    var id=e.target.id
    var file = document.getElementById(id).files[0];
    formData.append("Filedata", file);
    var t = file.type.split('/').pop().toLowerCase();
    if (t != "jpeg" && t != "jpg" && t != "png" && t != "bmp" && t != "gif") {
        toast.error('Please select a valid image file');
        document.getElementById(id).value = '';
        return false;
    }
    if (file.size > 1024000) {
        toast.error('Max Upload size is 1MB only');
        document.getElementById(id).value = '';
        return false;
    }
    return true;
}

 


