"use strict";function t(t,r,i){return r in t?Object.defineProperty(t,r,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[r]=i,t}Component({data:{ctrl:{}},properties:{childs:Array,opts:Array},attached:function(){this.triggerEvent("add",this,{bubbles:!0,composed:!0})},methods:{noop:function(){},getNode:function(t){for(var r=t.split("_"),i=this.data.childs[r[0]],e=1;e<r.length;e++)i=i.children[r[e]];return i},play:function(t){if(this.root.data.pauseVideo){for(var r=!1,i=t.target.id,e=this.root._videos.length;e--;)this.root._videos[e].id==i?r=!0:this.root._videos[e].pause();if(!r){var o=swan.createVideoContext(i);o.id=i,this.root._videos.push(o)}}},imgTap:function(t){var r=this.getNode(t.target.dataset.i);if(r.a)return this.linkTap(r.a);if(!r.attrs.ignore&&(this.root.triggerEvent("imgtap",r.attrs),this.root.data.previewImg)){var i=this.root.imgList[r.i];swan.previewImage({current:i,urls:this.root.imgList})}},imgLoad:function(r){var i,e=r.target.dataset.i,o=this.getNode(e);o.w?(this.data.opts[1]&&!this.data.ctrl[e]||-1==this.data.ctrl[e])&&(i=1):i=r.detail.width,i&&this.setData(t({},"ctrl."+e,i))},linkTap:function(t){var r=t.currentTarget?this.getNode(t.currentTarget.dataset.i).attrs:t,i=r.href;this.root.triggerEvent("linktap",r),i&&("#"==i[0]?this.root.navigateTo(i.substring(1)).catch(function(){}):i.includes("://")?this.root.data.copyLink&&swan.setClipboardData({data:i,success:function(){return swan.showToast({title:"链接已复制"})}}):swan.navigateTo({url:i,fail:function(){swan.switchTab({url:i,fail:function(){}})}}))},mediaError:function(r){var i=r.target.dataset.i,e=this.getNode(i);if("video"==e.name||"audio"==e.name){var o=(this.data.ctrl[i]||0)+1;if(o>e.src.length&&(o=0),o<e.src.length)return this.setData(t({},"ctrl."+i,o))}else"img"==e.name&&this.data.opts[2]&&this.setData(t({},"ctrl."+i,-1));this.root&&this.root.triggerEvent("error",{source:e.name,attrs:e.attrs,errMsg:r.detail.errMsg})}}});