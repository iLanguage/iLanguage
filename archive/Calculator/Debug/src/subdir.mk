################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
CPP_SRCS += \
../src/Calculator.cpp \
../src/CalculatorProject.cpp \
../src/LargeInt.cpp \
../src/Sequence.cpp 

OBJS += \
./src/Calculator.o \
./src/CalculatorProject.o \
./src/LargeInt.o \
./src/Sequence.o 

CPP_DEPS += \
./src/Calculator.d \
./src/CalculatorProject.d \
./src/LargeInt.d \
./src/Sequence.d 


# Each subdirectory must supply rules for building sources it contributes
src/%.o: ../src/%.cpp
	@echo 'Building file: $<'
	@echo 'Invoking: GCC C++ Compiler'
	g++ -O0 -g3 -Wall -c -fmessage-length=0 -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@:%.o=%.d)" -o"$@" "$<"
	@echo 'Finished building: $<'
	@echo ' '


