module ApplicationHelper
  def role_judgment
    if current_user.role == 'user'
      link_to('成為外送員', new_drivers_path, class: 'nav-link') + link_to('成為合作店家', new_stores_path, class: 'nav-link') 
   else
     if current_user.role == 'driver'
       link_to '開始外送', '#', class: 'nav-link'
     else
       link_to '開店', '#', class: 'nav-link'
     end
   end
  end
end
