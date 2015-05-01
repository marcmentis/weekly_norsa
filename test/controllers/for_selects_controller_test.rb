require 'test_helper'

class ForSelectsControllerTest < ActionController::TestCase
  setup do
    @for_select = for_selects(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:for_selects)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create for_select" do
    assert_difference('ForSelect.count') do
      post :create, for_select: { code: @for_select.code, code: @for_select.code, facility: @for_select.facility, grouper: @for_select.grouper, option_order: @for_select.option_order, text: @for_select.text, value: @for_select.value }
    end

    assert_redirected_to for_select_path(assigns(:for_select))
  end

  test "should show for_select" do
    get :show, id: @for_select
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @for_select
    assert_response :success
  end

  test "should update for_select" do
    patch :update, id: @for_select, for_select: { code: @for_select.code, code: @for_select.code, facility: @for_select.facility, grouper: @for_select.grouper, option_order: @for_select.option_order, text: @for_select.text, value: @for_select.value }
    assert_redirected_to for_select_path(assigns(:for_select))
  end

  test "should destroy for_select" do
    assert_difference('ForSelect.count', -1) do
      delete :destroy, id: @for_select
    end

    assert_redirected_to for_selects_path
  end
end
