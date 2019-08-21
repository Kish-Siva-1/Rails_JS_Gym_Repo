class MachinesController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :require_login
    before_action :authenticate_user!

    def new
        @routine = Routine.find_by(id: params.permit(:routine_id).values[0])
        authorize @routine
        if !@routine.nil?
            @weight = @routine.weights.build
            @machine = @weight.build_machine
        else 
            redirect_to user_routine_path(current_user, @routine)
        end   
    end 

    def create 
        @routine = Routine.find_by(id: params.permit(:routine_id).values[0])
        @weight = @routine.weights.build
        @machine = @weight.build_machine
        
        @machine = Machine.create(machine_params) 
        if @machine.valid?  
            authorize @machine
            @routine = @machine.weights.last.routine
            render json: @machine, status: 201
        else
            @routine = Routine.find_by(id: params.permit(:routine_id).values[0]) 
            render 'new'
        end
    end
    
    def edit
        @machine = Machine.find_by(params[:id])
        if !@machine.nil?
            authorize @machine
            @routine = @machine.weights.last.routine
        else
            redirect_to root_path 
        end
    end

    def update
        @machine = Machine.find(params[:id])
        authorize @machine 
        @machine.update(machine_params)
        if @machine.valid? && !@machine.nil?
            @routine = @machine.weights.last.routine
            redirect_to user_routine_path(current_user, @routine)    
        else
            @routine = Routine.find_by(id: params.permit(:routine_id).values[0]) 
            render 'new'
        end
    end

    def destroy
        routine = Routine.find_by_id(params[:routine_id])
        machine = Machine.find_by_id(params[:id])
        authorize routine
        if !machine.nil?
            machine.destroy
        end 
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
