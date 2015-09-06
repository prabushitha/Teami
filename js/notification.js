/**
 * Created by project on 9/5/2015.
 */
function notification(type,msg){
    if(type=='error'){
        $.notify(msg,{autoHide: true, autoHideDelay: 1500, position: 'right', className: 'error', gap:2});
    }
    if(type=='success'){
        $.notify(msg,{autoHide: true, autoHideDelay: 1500, position: 'right', className: 'success', gap:2});
    }
}