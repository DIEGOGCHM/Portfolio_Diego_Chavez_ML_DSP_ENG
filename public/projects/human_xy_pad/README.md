# PRD: Human XY Pad
> **Multineumatic Spatial Controller & Real-Time Granular Synthesis Interface**

- **Version**: 1.0 (Final)
- **Status**: Approved / Specification
- **Hardware / SW**: Arduino IDE (C++) / Max/MSP
- **Author**: Engineering & Sound Design Team (Diego Guillermo Chávez Muñoz)

---

## 1. Product Overview

The **Human XY Pad** is an interactive gestural control system and digital musical instrument that transforms physical 3D positioning and body movement into real-time audio DSP parameters and performance control. By utilizing an array of 6 ultrasonic sensors and a modular granular synthesis engine, the system eliminates physical contact with traditional mechanical interfaces, creating an immersive spatial audio expression experience.

### Core Purpose
Provide a low-latency (< 35 ms) expressive gestural interface for sound artists, composers, and interactive installations, linking physical X/Y positioning with complex granular audio texture generation.

---

## 2. System Architecture

The system consists of three main layers interconnected via serial communication (MIDI/OSC over USB at 9600 bps):

1. **Capture Layer (Hardware)**: Physical array of 6 ultrasonic sensors (HC-SR04) mounted on standardized rails delimiting a 2D spatial area.
2. **Embedded Processing Layer (Arduino / C++)**: Microcontroller handling pulse triggering, echo capture, boundary noise filtering, and spatial multipoint averaging.
3. **Synthesis & DSP Layer (Max/MSP)**: Graphical programming patch receiving distance data, loading local audio files (`.wav` / `.aiff`), fragmenting signals into grains, and modulating emission and filtering parameters.

---

## 3. Hardware & Firmware Specifications (Arduino C++)

### 3.1. Spatial Sensing Subsystem
The hardware integrates 6 strategically placed ultrasonic sensors to calibrate $X$ and $Y$ ranges (0 to 150 cm). Each sensor operates under the standard time-of-flight ultrasound physics equation:

$$\text{Distance} = \frac{\text{Duration Time} \times 0.0343}{2}$$

*(Where 0.0343 cm/µs represents the speed of sound at sea level).*

### 3.2. C++ Firmware Structure

| Code Module | Functionality Description | Priority |
| :--- | :--- | :---: |
| `void setup()` | Initial configuration. Defines baud rate (`Serial.begin(9600)`) and digital pins (`trigPin` Output, `echoPin` Input) for all 6 sensors. | HIGH |
| `void loop()` | Continuous execution loop. Triggers sequential sensing, applies maximum range constraints, calculates X/Y axis averages, and formats Serial output. | HIGH |
| `SonarSensor()` | Modular function. Emits HIGH pulse for 10 µs, measures response time with `pulseIn()`, applies boundary limit `Distance > maxDistance`, and returns processed value. | HIGH |
| `Spatial Averaging` | Calculates $\text{average1} = \frac{\text{distance1} + \text{distance2} + \text{distance3}}{3}$ to consolidate multipoint readings and reduce thermal/reflection noise. | MEDIUM |

---

## 4. Audio Engine Specifications (Max/MSP)

The receiver software unpacks the serial data stream using the `serial` object to control a **Granular Synthesis** patch:

- **Sample Selector Module**: Browses local files and loads audio samples (chord libraries, bass tones, sustained pads).
- **Grain Generator (Sub-patch `p grano`)**: Fragments loaded audio into micro-grains with adjustable duration (typically 10 ms to 100 ms).
- **Grain Polyphony (Grand Random Pad Generator)**: Groups parallel grain instances, modulating playback position, pitch, and amplitude envelopes simultaneously.
- **Processing & Filter Controls**: 
  - **Axis X**: Controls low-pass filter cutoff frequency (`biquad~` / `live.gain~`).
  - **Axis Y**: Modulates grain emission rate.

---

## 5. Hardware Blueprints & Schematics

### Plan 01: 2D Spatial Framework & Sensor Array
![Plan 01 Blueprints](/projects/human_xy_pad/Planos1.png)

### Plan 02: Hardware Wiring & Signal Topology
![Plan 02 Blueprints](/projects/human_xy_pad/Planos2.png)

---

## 6. Functional & Non-Functional Requirements

- **RF-01 (Sensing)**: Human presence detection up to 150 cm per axis without false triggers.
- **RF-02 (Signal Conditioning)**: Out-of-range sensor values are dynamically forced to zero (0).
- **RF-03 (Synchronization)**: Continuous serial transmission at 9600 bps.
- **RF-04 (Granular Manipulation)**: Dynamic loading of `.wav` / `.aiff` files and continuous gestural control.
- **Response Latency**: $< 35\text{ ms}$ from body movement to Max acoustic response.
- **Stability**: Controlled loop delay in `void loop()` (`delay(50)`) preventing serial buffer overflow.

---

## 7. Development Roadmap

- **v1.0 (Current - Deployed)**: Functional prototype with 6 ultrasonic sensors, Arduino C++ processing, and Max/MSP granular synthesis engine.
- **v2.0 (Q3 2026)**: Laser Time-of-Flight (ToF) sensors and Open Sound Control (OSC) protocol over Wi-Fi/UDP.
- **v3.0 (Q1 2027)**: Modular industrial chassis and 3D spatial polyphony support (Z-axis with top-down LiDAR).
