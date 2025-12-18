(function($){const{ssa,post,ssa_membership_product_settings,translations,interval_types,constants}=ssaMeprMembershipOptions;var selectedAppointmentTypes={}
if(ssa_membership_product_settings?.[constants.product_settings_str]&&Object.keys(ssa_membership_product_settings[constants.product_settings_str]).length!==0){selectedAppointmentTypes=ssa_membership_product_settings[constants.product_settings_str];}
const $includeApptsChechbox=$('#ssa-mepr-include-appointments');const $appointmentsBlock=$('#ssa-mepr-appointments-block');const $helperText=$('#ssa-memberpress-helperText');const $actionBtn=$('#ssa-mepr-action-btn');const $tableContent=$('#ssa-mepr-appointment-type-table-content');const $dropdown=$('#ssa_apptTypesDropdown');const $offerNote=$('#ssa-mepr-note-offers');const $setupNote=$('#ssa-mepr-note-not-setup');const $tableContainer=$('#ssa-mepr-appointment-type-table');const $meprProductForm=$('#mepr-products-form');const $meprProductBillingTypeSelect=$('#mepr-product-billing-type');const $meprProductTrialCheckbox=$('#_mepr_product_trial');const intervalTypesValues=Object.keys(interval_types);$includeApptsChechbox.on('change',function(){$appointmentsBlock.prop('aria-hidden',!this.checked).toggle(this.checked);$helperText.prop('aria-hidden',this.checked).toggle(!this.checked);});$actionBtn.on('click',function($event){$event.preventDefault();addAppointmentType();});$tableContent.on('click','.ssa-mepr-remove-appointment-types',function($event,el){$event.preventDefault();removeAppointmentType(this);});$tableContent.on('change','.ssa-mepr-interval',function(){var interval=$(this).val();var id=$(this).data('id');selectedAppointmentTypes[id]['per_interval']=parseInt(interval);});$tableContent.on('change','.ssa-mepr-interval-type',function(){var intervalType=$(this).val();var id=$(this).data('id');if(selectedAppointmentTypes[id]){selectedAppointmentTypes[id][constants.interval_type_str]=intervalType;}});$tableContent.on('change','.ssa-booking-limit-checkbox',function(){var id=$(this).data('id');var isChecked=$(this).is(':checked');selectedAppointmentTypes[id]['limit_booking_per_cycle']=$(this).is(':checked');var $bookingLimitInput=$(`#ssa-booking-limit-input-${id}`);if(isChecked){$bookingLimitInput.prop('disabled',false);$bookingLimitInput.prop('required',true);selectedAppointmentTypes[id]['max_num_of_appointments_per_cycle']=parseInt($bookingLimitInput.val());}else{$bookingLimitInput.prop('disabled',true);$bookingLimitInput.prop('required',false);}});$tableContent.on('change','.ssa-booking-trial-period-checkbox',function(){var id=$(this).data('id');var isChecked=$(this).is(':checked');selectedAppointmentTypes[id]['allow_booking_during_trials']=$(this).is(':checked');var $bookingLimitInput=$(`#ssa-booking-trial-period-input-${id}`);if(isChecked){$bookingLimitInput.prop('disabled',false);$bookingLimitInput.prop('required',true);selectedAppointmentTypes[id]['max_num_of_appointments_during_trials']=parseInt($bookingLimitInput.val());}else{$bookingLimitInput.prop('disabled',true);$bookingLimitInput.prop('required',false);}});$tableContent.on('change','.ssa-booking-limit-input',function(){var limit=$(this).val();var id=$(this).data('id');selectedAppointmentTypes[id]['max_num_of_appointments_per_cycle']=parseInt(limit);});$tableContent.on('change','.ssa-booking-trial-period-input',function(){var limit=$(this).val();var id=$(this).data('id');selectedAppointmentTypes[id]['max_num_of_appointments_during_trials']=parseInt(limit);});var billingType=$meprProductBillingTypeSelect.val();var trialCheckbox=$meprProductTrialCheckbox?.is(':checked');$meprProductForm.on('change','#mepr-product-billing-type',function(){if(!billingType||billingType!==$(this).val()){billingType=$(this).val();render();}});$meprProductForm.on('change','#_mepr_product_trial',function(){let isChecked=$(this).is(':checked');if(!trialCheckbox||trialCheckbox!==isChecked){trialCheckbox=isChecked;render();}});function isRecurringProduct(){return billingType&&billingType==='recurring';}
function isTrialChecked(){return trialCheckbox&&trialCheckbox===true;}
function shouldDisplayTrial(){return isRecurringProduct()&&isTrialChecked();}
function removeAppointmentType(el){var id=$(el).data('id');var $option=$(`#ssa_apptTypesDropdown option[value="${id}"]`);$option.prop('disabled',false).prop('aria-disabled',false);$dropdown.val($option.val());selectedAppointmentTypes[id]['active']=0;render();}
function addAppointmentType(){var appointment_type_id=$dropdown.val();var title=$('#ssa_apptTypesDropdown option:selected').data('title');$(`#ssa_apptTypesDropdown option[value="${appointment_type_id}"]`).prop('disabled',true).prop('aria-disabled',true);var $firstEnabledOption=$('#ssa_apptTypesDropdown option:first');while($firstEnabledOption.prop('disabled')){$firstEnabledOption=$firstEnabledOption.next();}
$dropdown.val($firstEnabledOption.val());if(Object.prototype.hasOwnProperty.call(selectedAppointmentTypes,appointment_type_id)){selectedAppointmentTypes[appointment_type_id]['active']=1;}else{Object.assign(selectedAppointmentTypes,{[appointment_type_id]:{title,active:1,[constants.per_interval_str]:1,[constants.interval_type_str]:intervalTypesValues[0],[constants.limit_per_cycle_str]:false,[constants.max_per_cycle_str]:1,[constants.allow_trial_str]:false,[constants.max_per_trial_str]:1,}});}
render();}
function render(){let allIncludedCount;let activeTypesCount;if(Object.keys(selectedAppointmentTypes)){allIncludedCount=Object.keys(selectedAppointmentTypes).length}
if(allIncludedCount){let appointmentTypesConfig=Object.values(selectedAppointmentTypes);activeTypesCount=appointmentTypesConfig.filter((item)=>!!item.active).length;}
if(activeTypesCount===0){$offerNote.hide();$setupNote.show();$tableContainer.hide();return;}
if(activeTypesCount>0){$tableContainer.show();$offerNote.show();$setupNote.hide();}
$tableContent.empty();let index=0;for(const id in selectedAppointmentTypes){if(!selectedAppointmentTypes[id]['active']){continue;}
index++;addAppointmentTypeTableBlock(index,id,selectedAppointmentTypes[id]);}}
function addAppointmentTypeTableBlock(index,id,settings){let myElm=document.createElement("div");myElm.style.display="flex";myElm.classList.add("ssa-mepr-flex","ssa-mepr-appointmnet-details");var intervalTypesOptions=intervalTypesValues.map(function(type){return`<option value="${type}" ${settings['interval_type'] === type ? 'selected' : ''}>${interval_types[type]}</option>`;}).join("");myElm.innerHTML=`<section class="ssa-mepr-flex-section">
                        <div class="ssa-mepr-flex-section-content">
                          ${index}
                        </div>
                      </section>

                      <section class="ssa-mepr-flex-column ssa-mepr-flex-section" style="flex-grow: 1;">
                        <div class="ssa-mepr-flex-section-content ssa-mepr-flex-section-content-middle">

                          <div class="ssa-mepr_appt-title">
                            <span>${translations['appointment_type']}</span>
                            <a target="_blank" href="${translations['appointments_link_url'] + id}">
                              ${settings['title']}
                            </a>
                          </div>

                          <!-- Number of appointments per interval -->
                          <div>
                            <label 
                              for="ssa-mepr-interval-${id}"
                              >
                              ${translations['number_of_appointments']}
                            </label>
                            <input 
                              type="number" 
                              id="ssa-mepr-interval-${id}"
                              data-id="${id}"
                              name="ssa-mepr-interval"
                              class="ssa-mepr-interval"
                              min="1"
                              value=${settings['per_interval']}
                              aria-describedby="number_of_interval_${id}"
                              required
                            />

                            <!-- Interval Type -->
                            <label 
                              for="ssa-mepr-interval-type-${id}"
                            >
                              <span aria-hidden="true">
                                ${translations['per']}
                              </span>
                              <span class="ssa-screen-reader-text" >
                                ${translations['interval_type']}
                              </span>
                            </label>
                            <select 
                              id="ssa-mepr-interval-type-${id}"
                              data-id="${id}"
                              name="ssa-mepr-interval-type"
                              class="ssa-mepr-interval-type"
                            >
                              ${intervalTypesOptions}
                            </select>
                            ${pointer('number_of_interval_'+id, translations.tooltips.intervals.title, translations.tooltips.intervals.text)}
                          </div>

                          <!-- Booking Limit Checkbox -->
                          <div>
                            <input 
                              type="checkbox" 
                              id="ssa-booking-limit-checkbox-${id}" 
                              class="ssa-booking-limit-checkbox" 
                              data-id="${id}"
                              ${settings['limit_booking_per_cycle'] ? 'checked' : ''}
                              aria-describedby="limit_booking_per_cycle_${id}"
                            />
                            <label 
                              for="ssa-booking-limit-checkbox-${id}"
                            >
                              ${translations['set_limit_per_cycle']}
                            </label>
                          
                            <label 
                              for="ssa-booking-limit-input-${id}"
                              class="ssa-screen-reader-text"
                            >
                              ${translations['limit_per_cycle']}
                            </label>
                            <input 
                              type="number" 
                              id="ssa-booking-limit-input-${id}" 
                              class="ssa-booking-limit-input"
                              ${settings['limit_booking_per_cycle'] ? '' : 'disabled'}
                              data-id="${id}"
                              min="1" 
                              value="${settings['max_num_of_appointments_per_cycle']}"
                              ${settings['limit_booking_per_cycle'] ? 'required' : ''}
                            />
                            ${pointer('limit_booking_per_cycle_' + id, translations.tooltips.limit_per_cycle.title, translations.tooltips.limit_per_cycle.text)}
                          </div>
                          <!-- End Booking Limit Checkbox -->

                          <!-- Trial periods booking -->
                          <div
                            style="display: ${shouldDisplayTrial() ? 'block' : 'none' }"
                          >
                            <input 
                              type="checkbox" 
                              id="ssa-booking-trial-period-checkbox-${id}" 
                              class="ssa-booking-trial-period-checkbox" 
                              data-id="${id}"
                              ${settings['allow_booking_during_trials'] ? 'checked' : ''}
                              aria-describedby="allow_booking_during_trials_${id}"
                            />
                            <label 
                              for="ssa-booking-trial-period-checkbox-${id}"
                            >
                              ${translations['trial_booking']}
                            </label>
                          
                            <label 
                              for="ssa-booking-trial-period-input-${id}"
                              class="ssa-screen-reader-text"
                            >
                              ${translations['trial_booking']}
                            </label>
                            <input 
                              type="number" 
                              id="ssa-booking-trial-period-input-${id}" 
                              class="ssa-booking-trial-period-input"
                              ${settings['allow_booking_during_trials'] ? '' : 'disabled'}
                              data-id="${id}"
                              min="1" 
                              value="${settings['max_num_of_appointments_during_trials']}"
                              ${settings['allow_booking_during_trials'] ? 'required' : ''}
                            />
                            ${pointer('allow_booking_during_trials_' + id, translations.tooltips.trial_booking.title, translations.tooltips.trial_booking.text)}
                          </div>
                          <!-- End Trial periods booking -->

                        </div>
                      </section>

                      <section class="ssa-mepr-flex-section">
                        <div class="ssa-mepr-flex-section-content">
                          <button 
                            data-id="${id}"
                            class="ssa-mepr-remove-appointment-types"
                            >
                            <span class=remove-span>
                              <i class="mp-icon mp-icon-cancel-circled mp-26"></i>
                            </span>
                            <span class="ssa-screen-reader-text">
                              ${translations['remove_appointment_type']} ${settings['title']}
                            </span>
                          </button>
                          
                        </div>
                      </section>`;$tableContent.append(myElm)}
function pointer(id,title,text){return`<span class="mepr-tooltip ssa-mepr-tooltip" id="${id}">
              <span><i class="mp-icon mp-icon-info-circled mp-16"></i></span>
              <span class="mepr-data-title mepr-hidden">${title}</span>
              <span class="mepr-data-info mepr-hidden">${text}</span>
            </span>`;}
function collectData(){var isMembershipEnabled=$includeApptsChechbox.prop('checked');return{isMembershipEnabled,productSettings:selectedAppointmentTypes}}
function isValidPositiveInteger(value){return Number.isInteger(value)&&value>0;}
function validateProductSettings(collectedData){var productSettings=collectedData.productSettings;for(var key in productSettings){var settings=productSettings[key];if((!isValidPositiveInteger(settings.max_num_of_appointments_during_trials)&&settings.allow_booking_during_trials)||(!isValidPositiveInteger(settings.max_num_of_appointments_per_cycle)&&settings.limit_booking_per_cycle)||!isValidPositiveInteger(settings.per_interval)){return false;}}
return true;}
$('form').on("submit",function(e){var form=$(this);const appointmentsInputField=form.find('#ssa-mepr-include-appointments');if(appointmentsInputField.length===0){return;}
var form_id=form.attr('id');if(form_id!=='post'){return;}
var post_type=$('#post_type').val();var post_id=$('#post_ID').val();if(post_type!=='memberpressproduct'||post_id.toString()!==post['ID'].toString()){return;}
var collectedData=collectData();if(!validateProductSettings(collectedData)){alert(translations.inputFieldsErrorMsg);e.preventDefault();return;}
$.ajax({url:ssa.api.root+'/memberpress/'+post['ID'],method:'POST',dataType:'json',contentType:'application/json',data:JSON.stringify(collectedData),beforeSend:(xhr)=>{xhr.setRequestHeader('X-WP-Nonce',ssa.api.nonce)}}).done(()=>{}).fail((error)=>{console.log(error)})});render();})(jQuery);