# Use official Bun image (Debian-based)
FROM oven/bun:1.0.25

# Avoid interactive prompts during build
ENV DEBIAN_FRONTEND=noninteractive

# Set working directory
WORKDIR /app

# Install tzdata and configure IST timezone
RUN apt-get update && \
    apt-get install -y tzdata && \
    ln -sf /usr/share/zoneinfo/Asia/Kolkata /etc/localtime && \
    echo "Asia/Kolkata" > /etc/timezone && \
    dpkg-reconfigure -f noninteractive tzdata

# Optional: verify timezone during build
RUN date

# Copy package.json and install dependencies
COPY package.json ./
RUN bun install

# Copy source code
COPY . .

# Expose service port
EXPOSE 8012

# Start the Bun service
CMD ["bun", "run", "start"]