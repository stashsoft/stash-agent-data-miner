import subprocess

process = None

def start_agent() -> int:
    global process
    if process is None or process.poll() is not None:  # Ensure no duplicate process
        process = subprocess.Popen(["python", "agent.py"])
        return process.pid
    
    return process.pid

def stop_agent():
    global process
    if process and process.poll() is None:  # Check if process is still running
        process.terminate()  # Send SIGTERM
        process.wait()  # Wait for process to exit
        process = None