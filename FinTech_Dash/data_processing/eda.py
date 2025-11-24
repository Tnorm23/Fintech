import pandas as pd
import sys
import json

# Get CSV file path from command-line argument
file_path = sys.argv[1]

# Read CSV
df = pd.read_csv(file_path)

# Basic summary
summary = {
    "mean": df.mean(numeric_only=True).to_dict(),
    "median": df.median(numeric_only=True).to_dict(),
    "max": df.max(numeric_only=True).to_dict(),
    "min": df.min(numeric_only=True).to_dict(),
}

# Print JSON to stdout
print(json.dumps(summary))
