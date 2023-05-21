import supabase from "./supabase";

const registerUser = async (email, password, name, slug) => {
  const { data: registerData, error: registerError } = await supabase
    .from("user_profile")
    .select("*")
    .eq("slug", slug);
  if (registerError) {
    return {
      success: false,
      error: registerError,
    };
  }
  if (registerData.length > 0) {
    return {
      success: false,
      error: registerError,
    };
  }

  const authResponse = await supabase.auth.signUp({
    email,
    password,
  });

  if (authResponse.error) {
    return {
      success: false,
      error: authResponse.error,
    };
  }

  if (authResponse.data.user) {
    const addMetaResponse = await supabase
      .from("user_profile")
      .insert([{ user_id: authResponse.data.user.id, name, slug }]);

    if (addMetaResponse.error) {
      return {
        success: false,
        error: addMetaResponse.error,
      };
    }
    return {
      success: true,
      message:
        "Registration successful, please wait a few moments to be taken to the login page",
      ...addMetaResponse.data,
    };
  }

  return {
    success: false,
    error: {
      message: "An unknown error has occurred",
    },
  };
};

const getListByUser = async (user_id) => {
  const { data, error } = await supabase
    .from("list")
    .select("title, id")
    .eq("user_id", user_id);
  if (error) {
    return {
      success: false,
      error,
    };
  }

  return {
    success: true,
    data,
  };
};

const getListById = async (id) => {
  const { data, error } = await supabase
    .from("list")
    .select("title")
    .eq("id", id);
  if (error) {
    return {
      success: false,
      error,
    };
  }

  return {
    success: true,
    data,
  };
};

const addList = async (title, user_id) => {
  const insertResponse = await supabase
    .from("list")
    .insert({
      title,
      user_id,
    })
    .select();

  if (insertResponse.error) {
    return {
      success: false,
      error: insertResponse.error,
    };
  }
  return {
    success: true,
    message: "successfully added",
    data: insertResponse.data,
  };
};

const deleteItem = async (itemId) => {
  const deleteResponse = await supabase
    .from("list_item")
    .delete()
    .eq("id", itemId);
};

const updateItem = async (itemId, status) => {
  const updateResponse = await supabase
    .from("list_item")
    .update({ status: status })
    .eq("id", itemId);
};


const updateOrder = async (itemId, current, destination, lid) => {
    // const updateFirstResponse = await supabase
    //   .from("list_item")
    //   .update({ order: - 1 })
    //   .gte("order", current)
    //   .lte("order", destination )
    //   .eq("list_id", list_id)

    //   const updateSecondResponse = await supabase
    //   .from("list_item")
    //   .update({ order: destination })
    //   .eq("id", itemId)
    await supabase.rpc('changeorder', { item_id : itemId, current : current, destination:destination, lid : lid })

  };




  

const addItem = async (title, order, status, list_id) => {
  const insertResponse = await supabase
    .from("list_item")
    .insert({
      title,
      order,
      status,
      list_id,
    })
    .select();

  if (insertResponse.error) {
    return {
      success: false,
      error: insertResponse.error,
    };
  }
  return {
    success: true,
    message: "successfully added",
    data: insertResponse.data,
  };
};

const getItemByList = async (id) => {
  const { data, error } = await supabase
    .from("list_item")
    .select("title, order, status, id")
    .eq("list_id", id)
    .order("order", { ascending: true });

  if (error) {
    return {
      success: false,
      error,
    };
  }

  return {
    success: true,
    data,
  };
};

const loginUser = async (email, password) => {
  const authResponse = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authResponse.error) {
    return {
      success: false,
      error: authResponse.error,
    };
  }

  if (authResponse.data.user) {
    const meta = await supabase
      .from("user_profile")
      .select("*")
      .eq("user_id", authResponse.data.user.id);

    if (meta.error) {
      return {
        success: false,
        error: meta.error,
      };
    }
    return {
      ...authResponse,
      meta,
      message: "Successfully logged in, please wait to be redirected",
      success: true,
    };
  }

  return {
    success: false,
    error: {
      message: "An unknown error has occurred",
    },
  };
};

const getCurrentUser = async () => {
  const session = await supabase.auth.getSession();
  if (session?.data?.session?.user) {
    const { data: meta, error } = await supabase
      .from("user_profile")
      .select("*")
      .eq("user_id", session.data.session.user.id)
      .single();

    if (error) {
      return {
        success: false,
        error,
      };
    }

    const user = {
      ...session.data.session.user,
      meta,
    };

    return {
      success: true,
      data: user,
    };
  }
  return {
    success: true,
    data: null,
  };
};

const getLatestUsers = async (num = 5) => {
  const { data, error } = await supabase
    .from("user_profile")
    .select("name, user_id")
    .order("created_at", { ascending: false })
    .limit(num);

  if (error) {
    return {
      success: false,
      error,
    };
  }

  return {
    success: true,
    data,
  };
};

const logout = async () => {
  const { error } = await supabase.auth.signOut();
  return { success: !error, error };
};

export {
  loginUser,
  registerUser,
  logout,
  getLatestUsers,
  getCurrentUser,
  getListByUser,
  getItemByList,
  addList,
  addItem,
  deleteItem,
  updateItem,
  getListById,
  updateOrder
};
