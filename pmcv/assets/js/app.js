currentPage = "splash";
app = {
	load: function(id, event, data){
		if(event != null){
			event.preventDefault();
		}
		center = document.querySelector('.page.center');
		cid = center.getAttribute("id");
		if(cid == id){return; }
		currentPage = id;
		
		other = document.getElementById(id);
		other.className = "page right";
		setTimeout(function(){other.className = "page transition center"; }, 100);
		center.className = "page transition left";
		setTimeout(app.removeTrans, 2000, center, "left");
	},
	back: function(id, data){
		center = document.querySelector('.page.center');
		cid = center.getAttribute("id");
		if(cid == id){return; }
		console.log(cid);
		currentPage = id;
		
		other = document.getElementById(id);
		other.className = "page left";
		setTimeout(function(){other.className = "page transition center"; }, 100);
		center.className = "page transition right";
		setTimeout(app.removeTrans, 2000, center, "right");
	},
	removeTrans: function(obj, place){
		obj.className = "page " + place;
	},
	loading: function(){
		ld = document.querySelector(".loader");
		ld.className = "loader";
	},
	finished: function(){
		ld = document.querySelector(".loader");
		ld.className = "loader hide";
	},
	success: function(msg){
		notie.alert({ type: 'success', text: msg, time: 3 })
	},
	error: function(msg){
		notie.alert({ type: 'error', text: msg, time: 3 })
	}
};

$(document).on('focus', '.auto-form', function(){
	$(this).attr('data-value', $(this).val() );
});
$(document).on('keypress', '.auto-form', function(){
	$(this).addClass('data-edit')
});

$(document).on('blur', '.auto-form', function(){
	var oldVal = $(this).attr('data-value');
	var curVal = $(this).val();
	var datakey = $(this).attr('data-key');
	$(this).removeClass('data-edit');
	
	var data = {};
	data[ datakey ] = curVal;
	
	var obj = $(this);
	
	if(oldVal == curVal || curVal == ""){
		
	}else{
		$(this).addClass('data-saving');
		setTimeout(function(){ obj.addClass('data-saved'); }, 3000);
		setTimeout( removeSaved, 6000, obj);
		/*$.post("/save.php", data, function(ret){
			obj.removeClass('data-saving');
			if(ret.status == 200){
				obj.addClass('data-saved');
				setTimeout( removeSaved, 3000, obj);
			}else{
				obj.addClass('data-not-saved');
				setTimeout( removeNotSaved, 3000, obj);
			}
		});*/
	}
});

function removeSaved(obj){ obj.removeClass('data-saved'); }
function removeNotSaved(obj){ obj.removeClass('data-not-saved'); }

$(document).on('click', '.btn-repeat', function(){
	var btn = $(this);
	cls = "." + btn.attr('data-target');
	var target = $(cls).clone().removeClass( btn.attr('data-target') ).prepend("<button class='btn btn-repeat-close'><i class='fa fa-close'></i></button>");
	$(cls).parent().append(target);
});

$(document).on('click', '.btn-repeat-close', function(){
	$(this).parent().remove();
});