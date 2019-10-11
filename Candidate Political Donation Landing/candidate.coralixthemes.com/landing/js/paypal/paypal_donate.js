jQuery(document).ready(function()
{
	// the minimum required value to be entered.
	// in this case PayPal takes $0.35 from a $1
	// donation, hence we ask for at least $1.35
	var minimum_value = 1.35;
	
	// attach this script to the form's submit action
	jQuery('#form_paypal').submit(function()
	{
		// check if there is an amount entered
		if (jQuery('#input_amount').val() > null)
		{
			// is the amount equal to or higher than the minimum_value?
			if (jQuery('#input_amount').val() < minimum_value)
			{
				// need more amount
				// hide messages, show more amount error
				jQuery('#msg_noamount').hide();
				jQuery('#msg_moreamount').fadeIn();
				return false; // prevent the form from submitting
			}
			else
			{
				// amount is more than minimum_value
				// hide messages, show activity
				jQuery('#msg_moreamount').hide();
				jQuery('#msg_noamount').hide();
				jQuery('#msg_activity').fadeIn();
				return true; // submit the form
			}
		}
		else
		{
			// no amount entered at all
			// hide messages, show no amount error
			jQuery('#msg_moreamount').hide();
			jQuery('#msg_noamount').fadeIn();
			return false; // prevent the form from submitting
		}
	});
});
jQuery(document).ready(function()
{
	// the minimum required value to be entered.
	// in this case PayPal takes $0.35 from a $1
	// donation, hence we ask for at least $1.35
	var minimum_value = 1.35;
 
	// attach this script to the form's submit action
	jQuery('#form_paypal_rec').submit(function()
	{
		// check if there is an amount entered
		if (jQuery('#input_amount_rec').val() > null)
		{
			// is the amount equal to or higher than the minimum_value?
			if (jQuery('#input_amount_rec').val() < minimum_value)
			{
				// need more amount
				// hide messages, show more amount error
				jQuery('#msg_noamount_rec').hide();
				jQuery('#msg_moreamount_rec').fadeIn();
				return false; // prevent the form from submitting
			}
			else
			{
				// amount is more than minimum_value
				// hide messages, show activity
				jQuery('#msg_moreamount_rec').hide();
				jQuery('#msg_noamount_rec').hide();
				jQuery('#msg_activity_rec').fadeIn();
				return true; // submit the form
			}
		}
		else
		{
			// no amount entered at all
			// hide messages, show no amount error
			jQuery('#msg_moreamount_rec').hide();
			jQuery('#msg_noamount_rec').fadeIn();
			return false; // prevent the form from submitting
		}
	});
});
