var nowIndex = -1;
var bookIndex = -1;
$(function(){
	loadinging();
	
	var openStatus = false;
	var openNext = false;
	$('.books').on('click',function(){
		if(openStatus == false)
		{
			openStatus =  true;
			//获取当前书的索引
			var index = $(this).attr('index');			
			$('.book'+index).show().addClass('rotate720');
			$('.b'+index).hide();
			bookIndex = index;
			nowIndex = 1;
			setTimeout(function(){
				$('.book'+index).find('.bookIn').eq(0).addClass('fanshu');
			},500);
			//显示下一页
			$('#fan').show();
			$('#fan').on('click',function(){
				if(openNext==false)
				{
					openNext = true;
					if(nowIndex!=-1)
					{
						if(nowIndex!=$('.book'+bookIndex).find('.bookIn').length-1)
						{
							$('.book'+bookIndex).find('.bookIn').eq(nowIndex).addClass('fanshu');
							nowIndex++;
						}else{
							nowIndex--;
							$('.book'+bookIndex).find('.bookIn').eq(nowIndex).removeClass('fanshu');
						}
						
					}
					setTimeout(function(){
						openNext = false;
					},500);
				}
				
			});
			//返回首页
			$('#back').show();
			$('#back').on('click',function(){
				$('.book'+index).find('.bookIn').eq(0).removeClass('fanshu');
				$('.book'+index).removeClass('rotate720');
				setTimeout(function(){
					$('.b'+index).show();
					$('.book'+index).hide();
					$('.book'+index).find('.bookIn').removeClass('fanshu');
					openStatus = false;
					openNext = false;
					nowIndex=-1;
					$('#fan').hide();
					$('#back').hide();
				},1100);
			});
				
		}
		
	});
	//添加课本
	addPage('.book1','three',6);
	addPage('.book2','two',9);
	addPage('.book3','one',8);
	addPage('.book4','four',9);
	addPage('.book5','five',18);
//	nowIndex = 1;
//	bookIndex = 1;
//	$('.book'+bookIndex).find('.bookIn').eq(0).addClass('fanshu');
	
	//左右滑动
	touch.on(document, "swipeleft", function(){
		if(nowIndex!=-1)
		{
			if(nowIndex!=$('.book'+bookIndex).find('.bookIn').length-1)
			{
				$('.book'+bookIndex).find('.bookIn').eq(nowIndex).addClass('fanshu');
				nowIndex++;
			}
			
		}
	});
	touch.on(document, "swiperight", function(){
		if(nowIndex!=-1)
		{
			if(nowIndex!=1)
			{
				nowIndex--;
				$('.book'+bookIndex).find('.bookIn').eq(nowIndex).removeClass('fanshu');
			}
			
		}
	});
	
});
function addPage(className,imgName,n)
{
	var j = n;
	for(var i=0;i<n;i++,j--)
	{
		var html = "";
		if(i==0)
		{
			html += '<div class="bookIn" style="z-index:'+j+'"><img src="img/'+imgName+""+i+'.png" /></div>';
		}else{
			html += '<div class="bookIn" style="z-index:'+j+'"><img src="img/'+imgName+""+i+'.jpg" /></div>';
		}
		
		$(className).append(html);
	}	
	$(className).css('display','none');
}
function home(){
	$('#bookContainer').fadeIn(1000);
	$('.b1').attr('data-scroll-reveal','enter top and move 50px over 1.2s');
	$('.b2').attr('data-scroll-reveal','enter top and move 50px over 1.2s');
	$('.b3').attr('data-scroll-reveal','enter left and move 50px over 1.2s');
	$('.b4').attr('data-scroll-reveal','enter bottom and move 50px over 1.2s');
	$('.b5').attr('data-scroll-reveal','enter right and move 50px over 1.2s');
	//开启滑动动画
	if(!(/msie [6|7|8|9]/i.test(navigator.userAgent))) {
		(function() {
			window.scrollReveal = new scrollReveal({
				reset: true
			});
		})();
	};
}
function loadinging(){
	var l = 1;
	var ltween = setInterval(function(){
		$('.bar').text(l+'%');
		$('.loadbar>div').css('width',l*0.04+'rem');
		l++;
		if(l==101)
		{
			clearInterval(ltween);
			//显示首页
			$('#loading').hide();
			$('#homepage').fadeIn(1000);
			$('.title').hide();
			$('.fiveTitle').hide();
			setTimeout(function(){
				$('.title').show().addClass('animated bounceInDown');
				$('.fiveTitle').show().addClass('animated bounceIn');
				setTimeout(function(){
					$('#homepage').fadeOut(1000);
					home();
				},2000);
			},500);
			
		}
	},40);
}
