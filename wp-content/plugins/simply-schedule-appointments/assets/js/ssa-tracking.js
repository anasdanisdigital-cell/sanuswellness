;(function(ssaTracking,undefined){var trackPage=function(pageData){if(window.ga){window.ga('set','page',pageData.path);window.ga('send','pageview');}
if(window.__gaTracker){__gaTracker('set','page',pageData.path);__gaTracker('send','pageview');}
if(window.dataLayer){window.dataLayer.push({'event':'Pageview','pagePath':pageData.url,'pageTitle':pageData.title});}
if(window.fbq){window.fbq('trackCustom','virtualPageview',{'url':pageData.url})}
if(window.analytics){window.analytics.page(pageData.name,{'name':pageData.name,'path':pageData.path,'referrer':pageData.referrer,'title':pageData.title,'url':pageData.url})}};var trackEvent=function(pageData){var includeValue=pageData.action==='bookingCompleted'&&pageData.hasOwnProperty('value')
var includeEmail=pageData.action==='bookingCompleted'&&pageData.hasOwnProperty('sha256_email_address');if(window.ga){window.ga('send',{hitType:'event',eventCategory:'Appointment',eventAction:pageData.action,eventLabel:pageData.appointmentType,eventValue:includeValue?Math.round(pageData.value.price):null})}
if(window.__gaTracker){__gaTracker('send',{hitType:'event',eventCategory:'Appointment',eventAction:pageData.action,eventLabel:pageData.appointmentType,eventValue:includeValue?Math.round(pageData.value.price):null})}
if(window.dataLayer){var obj={'event':pageData.action,'appointmentType':pageData.appointmentType}
if(includeValue){obj.conversionValue=pageData.value.price
obj.currency=pageData.value.currency}
if(includeEmail){obj.sha256_email_address=pageData.sha256_email_address}
window.dataLayer.push(obj);}
if(window.fbq){if(includeValue){window.fbq('track','Purchase',{value:pageData.value.price,currency:pageData.value.currency})}else if(pageData.action==='bookingCompleted'){window.fbq('track','Schedule');}else if(pageData.action==='paymentInitiated'){window.fbq('track','InitiateCheckout',{value:pageData.value.price,currency:pageData.value.currency})}else{window.fbq('trackCustom',pageData.action,{appointmentType:pageData.appointmentType});}}
if(window.analytics){if(includeValue){analytics.track('Order Completed',{'total':pageData.value.price,'currency':pageData.value.currency,'products':[pageData.appointmentType]});}else if(pageData.action==='paymentInitiated'){analytics.track('Checkout Started',{'value':pageData.value.price,'currency':pageData.value.currency,'products':[pageData.appointmentType]})}else{analytics.track(pageData.action,{'appointmentType':pageData.appointmentType})}}};ssaTracking.listen=function(e){if(typeof e.data=='object'&&e.data.hasOwnProperty('ssaType')){if(e.data.ssaType==='page'){trackPage(e.data);}
if(e.data.ssaType==='event'){trackEvent(e.data);}}};}(window.ssaTracking=window.ssaTracking||{}));window.addEventListener('message',ssaTracking.listen,false);