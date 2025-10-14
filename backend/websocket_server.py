import asyncio
import websockets
import json

async def handler(websocket, path):
    print(f"Client connected from {websocket.remote_address}")
    try:
        async for message in websocket:
            print(f"Received message: {message}")
            try:
                data = json.loads(message)
                event = data.get('event')
                payload = data.get('payload')

                if event == 'sendMessage':
                    response = {
                        'event': 'receiveMessage',
                        'payload': {
                            'id': 'response-123',
                            'role': 'assistant',
                            'content': f"Received your message: '{payload.get('content')}'",
                            'type': 'text',
                            'createdAt': '2025-10-13T12:00:00Z',
                            'updatedAt': '2025-10-13T12:00:00Z',
                            'conversationId': payload.get('conversationId')
                        }
                    }
                    await websocket.send(json.dumps(response))
                
                elif event == 'typing':
                    response = {
                        'event': 'typing',
                        'payload': {
                            'userId': 'server',
                            'isTyping': True
                        }
                    }
                    await websocket.send(json.dumps(response))

            except json.JSONDecodeError:
                print("Invalid JSON received")
                await websocket.send(json.dumps({'event': 'error', 'payload': 'Invalid JSON'}))

    except websockets.exceptions.ConnectionClosed as e:
        print(f"Connection closed: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        print(f"Client disconnected from {websocket.remote_address}")

async def main():
    async with websockets.serve(handler, "localhost", 8000):
        print("WebSocket server started at ws://localhost:8000")
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())
