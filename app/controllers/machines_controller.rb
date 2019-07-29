class MachinesController < ApplicationController
    before_action :require_login

    def new
           @routine = Routine.find_by(id: params.permit(:routine_id).values[0])
            @weight = @routine.weights.build
            @machine = @weight.build_machine   
    end 

    def create 
            @machine = Machine.create(machine_params)
            if @machine.valid? 
                @routine = @machine.weights.last.routine
                redirect_to user_routine_path(current_user, @routine)    
            else
                @routine = Routine.find_by(id: params.permit(:routine_id).values[0]) 
                render 'new'
            end
    end

    def show
           @machine = Machine.find(params[:id])
    end

    def edit
            @machine = Machine.find(params[:id])
            @routine = @machine.weights.last.routine
    end

    def update
            @machine = Machine.find(params[:id])
            @machine.update(machine_params)
            if @machine.valid? 
                @routine = @machine.weights.last.routine
                redirect_to user_routine_path(current_user, @routine)    
            else
                @routine = Routine.find_by(id: params.permit(:routine_id).values[0]) 
                render 'new'
            end
    end

    def destroy
            @routine = Machine.find(params[:id]).weights.last.routine
            Machine.find(params[:id]).destroy
            redirect_to user_routine_path(current_user, @routine)
    end

    private

    def machine_params
        params.require("machine").permit(:name, :repetitions, :sets, weights_attributes: [:weight, :routine_id, :machine_id])
    end

    def require_login
        if current_user.nil? 
            redirect_to '/login'
        end
    end

end
